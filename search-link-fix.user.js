// ==UserScript==
// @name         Search Link Fix
// @namespace    https://blog.joyfui.com/
// @version      11
// @author       joyfuI
// @description  네이버, 구글, 다음 등 검색엔진의 사용자 추적을 위한 링크를 수정합니다.
// @homepageURL  https://github.com/joyfuI/search-link-fix
// @downloadURL  https://raw.githubusercontent.com/joyfuI/search-link-fix/master/search-link-fix.user.js
// @include      https://www.google.*/search*
// @include      https://www.google.*.*/search*
// @include      https://search.naver.com/search.naver*
// @include      https://m.search.naver.com/search.naver*
// @include      https://search.daum.net/search*
// @include      https://m.search.daum.net/search*
// @include      https://search.daum.net/nate*
// @include      https://m.search.daum.net/nate*
// @include      https://search.zum.com/search.zum*
// @include      https://m.search.zum.com/search.zum*
// @include      https://www.bing.com/search*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() => {
  "use strict";
  const domain = location.host.split('.');

  const processLinks = (container, selector = 'a') => {
    if (!container) {
      return;
    }
    const elements = container.querySelectorAll(selector);
    for (let element of elements) {
      element.removeAttribute('onclick');
      element.removeAttribute('ping');  // 크롬용(구글검색)
      for (let key of Object.keys(element.dataset)) {
        delete element.dataset[key];
      }
    }
  }

  // 구글 맞춤 검색처럼 동적으로 추가된 링크도 처리하기 위해 MutationObserver 사용
  const setupObserver = (container, selector = 'a', callback = processLinks) => {
    if (!container) {
      return;
    }
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
          for (let node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && callback) {
              callback(node, selector);
            }
          }
        }
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: true
    });
    return observer;
  }

  const injectScript = (scriptText) => {
    const script = document.createElement('script');
    script.textContent = scriptText;
    document.head.appendChild(script);
  }

  // 구글
  if (domain.includes('google')) {
    const container = document.getElementById('res');
    const selector = 'a';
    processLinks(container, selector);
    setupObserver(container, selector);
  }

  // 네이버
  else if (domain.includes('naver')) {
    const container = document.getElementById('container');
    const selector = 'a:not([href="#"])';
    processLinks(container, selector);
    setupObserver(container, selector);
    injectScript('window.goOtherCR = function () {};');
  }

  // 다음, 네이트
  else if (domain.includes('daum')) {
    const container = document.getElementById('daumContent');
    const selector = 'a:not([href="javascript:"])';
    processLinks(container, selector);
    setupObserver(container, selector);
    injectScript('window.smartLog = function () {};');
  }

  // 줌
  else if (domain.includes('zum')) {
    const container = document.getElementById('container');
    const selector = 'a';
    processLinks(container, selector);
    setupObserver(container, selector);
  }

  // 빙
  else if (domain.includes('bing')) {
    const container = document.getElementById('b_results');
    const selector = 'a[href^="https://www.bing.com/ck/a"]';
    const removeCKA = (node) => {
      const elements = node.querySelectorAll(selector);
      for (let element of elements) {
        const url = new URL(element.href);
        const u = url.searchParams.get('u') ?? '';
        const decodeU = atob(u.slice(2));
        if (decodeU) {
          element.href = decodeU;
        }
      }
    }
    removeCKA(container);
    setupObserver(container, selector, removeCKA);
  }
})();
