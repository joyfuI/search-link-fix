// ==UserScript==
// @name				Search Link Fix
// @namespace		https://blog.joyfui.com/
// @version			10
// @author			joyfuI
// @description	네이버, 구글, 다음 등 검색엔진의 사용자 추적을 위한 링크를 수정합니다.
// @homepageURL	https://github.com/joyfuI/search-link-fix
// @downloadURL	https://raw.githubusercontent.com/joyfuI/search-link-fix/master/search-link-fix.user.js
// @include			https://www.google.*/search*
// @include			https://www.google.*.*/search*
// @include			https://search.naver.com/search.naver*
// @include			https://m.search.naver.com/search.naver*
// @include			https://search.daum.net/search*
// @include			https://m.search.daum.net/search*
// @include			https://search.daum.net/nate*
// @include			https://m.search.daum.net/nate*
// @include			https://search.zum.com/search.zum*
// @include			https://m.search.zum.com/search.zum*
// @run-at			document-end
// ==/UserScript==

(() => {
  "use strict";
  const domain = location.host.split('.');

  // 구글
  if (domain.includes('google')) {
    const elements = document.getElementById('res').getElementsByTagName('a');
    for (let element of elements) {
      element.removeAttribute('ping');  // 크롬용
      Object.keys(element.dataset).forEach((key) => {
        delete element.dataset[key];
      });
    }
  }

  // 네이버
  else if (domain.includes('naver')) {
    const elements = document.getElementById('container').getElementsByTagName('a');
    for (let element of elements) {
      if (element.href === '#') {
        break;  // # 링크 제외
      }
      element.removeAttribute('onclick');
      Object.keys(element.dataset).forEach((key) => {
        delete element.dataset[key];
      });
    }
    const script = document.createElement('script');
    script.textContent = 'window.goOtherCR = function () {};';
    document.head.appendChild(script);
  }

  // 다음, 네이트
  else if (domain.includes('daum')) {
    const elements = document.getElementById('daumContent').getElementsByTagName('a');
    for (let element of elements) {
      Object.keys(element.dataset).forEach((key) => {
        delete element.dataset[key];
      });
    }
    const script = document.createElement('script');
    script.textContent = 'window.smartLog = function () {};';
    document.head.appendChild(script);
  }

  // 줌
  else if (domain.includes('zum')) {
    const elements = document.getElementById('container').getElementsByTagName('a');
    for (let element of elements) {
      element.removeAttribute('onclick');
      Object.keys(element.dataset).forEach((key) => {
        delete element.dataset[key];
      });
    }
    if (document.getElementById('googleSearchLayer') !== null) { // 귀찮게시리 왜 구글 맞춤 검색을 사용하는거야ㅡㅡ
      const tmp = setInterval(() => {
        if (document.getElementById('googleLoadingImg').style.display === 'none') {  // 구글 맞춤 검색 로딩이 완료되면
          clearInterval(tmp);
          const elements = document.getElementById('googleSearchLayer').getElementsByTagName('a');
          for (let element of elements) {
            Object.keys(element.dataset).forEach((key) => {
              delete element.dataset[key];
            });
          }
        }
      }, 100);
    }
  }
})();
