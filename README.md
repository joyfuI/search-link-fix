# search-link-fix
네이버, 구글, 다음 검색엔진에서 사용자 추적을 위해 링크를 변형하는 것을 차단하는 유저 스크립트입니다.
## 소개
![네이버](https://i.imgur.com/fQpEsUG.gif)
![구글](https://i.imgur.com/Sh6ze0Y.gif)  
위 이미지처럼 검색엔진들은 링크를 누르는 순간 추적 링크로 바꾸는 방법을 통해서 사용자가 어떤 링크를 클릭하는지 수집하고 있습니다.  
이 스크립트는 이런 행위를 차단합니다.  
![적용전후](https://i.imgur.com/SLBMety.png)
## 설치
1. 브라우저에 맞게 유저스크립트 확장기능 중 하나를 설치합니다.
[Greasemonkey](https://www.greasespot.net/) - 파이어폭스  
[Tampermonkey](https://tampermonkey.net/) - 크롬, 엣지, 사파리, 파이어폭스, 오페라, 돌핀, UC  
[Violentmonkey](https://violentmonkey.github.io/) - 크롬, 파이어폭스, Maxthon
2. [여기](https://raw.githubusercontent.com/joyfuI/search-link-fix/master/search-link-fix.user.js)에서 유저 스크립트를 설치합니다.
3. ????
4. PROFIT!
## 주의사항
검색 페이지에 있는 모든 <a> 태그의 click 이벤트를 무력화 시키는 방식입니다.  
이로인해 링크를 클릭해도 아무런 반응이 없는 문제가 생길 수 있으므로 문제발견 시 적극적으로 알려주세요.
