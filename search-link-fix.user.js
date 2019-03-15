// ==UserScript==
// @name		Search Link Fix
// @namespace	https://joyfui.wo.tc/
// @version		8
// @author		joyfuI
// @description	네이버, 구글, 다음 등 검색엔진의 사용자 추적을 위한 링크를 수정합니다.
// @homepageURL	https://github.com/joyfuI/search-link-fix
// @downloadURL	https://raw.githubusercontent.com/joyfuI/search-link-fix/master/search-link-fix.user.js
// @include		https://www.google.*/search*
// @include		https://www.google.*.*/search*
// @include		https://search.naver.com/search.naver*
// @include		https://m.search.naver.com/search.naver*
// @include		https://search.daum.net/search*
// @include		https://m.search.daum.net/search*
// @include		http://search.zum.com/search.zum*
// @include		https://m.search.zum.com/search.zum*
// @include		https://search.daum.net/nate*
// @include		https://m.search.daum.net/nate*
// @include		http://search.dreamwiz.com/*
// @include		http://m.search.dreamwiz.com/*
// @run-at		document-end
// @grant		unsafeWindow
// ==/UserScript==

(function () {
	"use strict";
	if (location.host.indexOf('google') > -1) {	// 구글
		var nodes = document.getElementById('main').getElementsByTagName('a');
		for (var i of nodes) {
			i.removeAttribute('onmousedown');
			i.removeAttribute('ping');	// 크롬용
		}
		var tag = document.createElement('script');
		tag.textContent = 'var tmp = setInterval(function () { window.rwt = window.s_sFa = function () {}; }, 100); setTimeout(function () { clearInterval(tmp); }, 3000);';	// 이상하게 페이지 로딩 직후엔 적용이 안돼서 타이머 사용
		document.head.appendChild(tag);

	} else if (location.host.indexOf('naver') > -1) {	// 네이버
		var nodes = document.getElementById('container').getElementsByTagName('a');
		for (var i of nodes) {
			if (i.href.charAt(i.href.length - 1) != '#') {	// # 링크 제외
				i.removeAttribute('onclick');
			}
		}
		var tag = document.createElement('script');
		tag.textContent = 'window.goOtherCR = window.goOtherTCR = function () {};';
		document.head.appendChild(tag);

	} else if (location.host.indexOf('daum') > -1) {	// 다음, 네이트
		var nodes = document.getElementById('daumContent').getElementsByTagName('a');
		for (var i of nodes) {
			i.removeAttribute('onclick');
			i.removeAttribute('data-docid');
		}
		var tag = document.createElement('script');
		tag.textContent = 'window.smartLog = function () {};';
		document.head.appendChild(tag);

	} else if (location.host.indexOf('zum') > -1) {	// 줌
		var nodes = document.getElementById('container').getElementsByTagName('a');
		for (var i of nodes) {
			i.removeAttribute('onclick');
		}
		var tag = document.createElement('script');
		tag.textContent = 'var tmp = setInterval(function () { window.goOutlink = window.zum.a.D = function () {}; }, 100); setTimeout(function () { clearInterval(tmp); }, 3000);';	// 이상하게 페이지 로딩 직후엔 적용이 안돼서 타이머 사용
		document.head.appendChild(tag);
		if (document.getElementById('googleSearchLayer') != null) {	// 귀찮게시리 왜 구글 맞춤 검색을 사용하는거야ㅡㅡ
			var tmp = setInterval(function () {
				var googleWebSearch = (typeof(googleWebSearch) === 'undefined') ? unsafeWindow.zum.googleWebSearch : unsafeWindow.googleWebSearch;
				if (googleWebSearch.googleWebSearchTotalPage != 0) {	// 구글 맞춤 검색 로딩이 완료되면
					clearInterval(tmp);
					var nodes = document.getElementById('googleSearchLayer').getElementsByTagName('a');
					for (var i of nodes) {
						i.removeAttribute('data-cturl');
						i.removeAttribute('data-ctorig');
					}
				}
			}, 100);
		}

	} else if (location.host.indexOf('dreamwiz') > -1) {	// 드림위즈
		var nodes = document.getElementsByClassName('midbox_wrap');
		if (nodes.length !== 0) {
			nodes = nodes[0].getElementsByTagName('a');
			for (var i of nodes) {
				i.removeAttribute('onclick');
			}
		}
		var tag = document.createElement('script');
		tag.textContent = 'window.publog_send = window.publog_click = function () {};';
		document.head.appendChild(tag);
	}
})();
