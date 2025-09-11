// js 파일 따로 두는 거 이제 안댄댜..

var container = document.getElementById("#map");

var options = {
  center: new kakao.maps.LatLng(35.238389043582984, 128.86970351780747),
  level: 3,
};

var staticMapBox = new kakao.maps.Map(container, options);

// 정적 지도에 마커 그리기
