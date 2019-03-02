// ==UserScript==
// @name		Search Link Fix
// @namespace	https://joyfui.wo.tc/
// @version		2
// @author		joyfuI
// @description	네이버, 구글, 다음 검색엔진의 사용자 추적을 위한 링크를 수정합니다.
// @homepage	https://github.com/joyfuI/search-link-fix
// @downloadURL	https://raw.githubusercontent.com/joyfuI/search-link-fix/master/search-link-fix.user.js
// @include		https://www.google.*/search*
// @include		https://www.google.*.*/search*
// @include		https://search.naver.com/search.naver*
// @include		https://search.daum.net/search*
// @run-at		document-end
// @grant		none
// ==/UserScript==

(function() {
	"use strict";
	if (location.host.indexOf('google') > -1)	// 구글
	{
		var nodes = document.getElementById('rcnt').getElementsByTagName('a');
		for (var i of nodes)
		{
			i.removeAttribute('onmousedown');
			i.removeAttribute('ping');	// 크롬용
		}
		var tag = document.createElement('script');
		tag.textContent = 'var tmp = setInterval(function () {window.rwt = window.s_sFa = function () {};}, 100); setTimeout(function () {clearInterval(tmp);}, 3000);';	// 구글은 이상하게 페이지 로딩 직후엔 적용이 안됨
		document.head.appendChild(tag);
	}
	else if (location.host.indexOf('naver') > -1)	// 네이버
	{
		var nodes = document.getElementById('container').getElementsByTagName('a');
		for (var i of nodes)
			i.removeAttribute('onclick');
		var tag = document.createElement('script');
		tag.textContent = 'window.goOtherCR = window.goOtherTCR = function () {};';
		document.head.appendChild(tag);
	}
	else if (location.host.indexOf('daum') > -1)	// 다음
	{
		var nodes = document.getElementById('cMain').getElementsByTagName('a');
		for (var i of nodes)
			i.removeAttribute('onclick');
		var tag = document.createElement('script');
		tag.textContent = 'window.smartLog = function () {};';
		document.head.appendChild(tag);
	}
})();
