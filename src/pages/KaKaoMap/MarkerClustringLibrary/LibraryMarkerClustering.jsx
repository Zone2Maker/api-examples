import {
  CustomOverlayMap,
  Map,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";
import * as s from "./styles.js";
import { useState } from "react";
import { positions } from "../positions.js";

/** @jsxImportSource @emotion/react */
function LibraryMarkerClustering() {
  // 더미데이터, 너무 길어서 다른 파일에 두고 import함..
  const dummyPositions = positions;

  // 카카오 맵: 숫자 클수록 확대(가까이), 숫자 작을수록 축소(멀리)
  // 이 레벨 보다 멀어지면(숫자가 작아지면) 클러스터를 숨김
  const CLUSTERER_VISIBLE_MIN_LEVEL = 8;

  const [level, setLevel] = useState(13);
  // 대한민국 중심
  const [center, setCenter] = useState({
    lat: 35.57,
    lng: 128.15,
  });
  console.log(level);

  const centerOnChangeHandler = (map) => {
    const newCenter = map.getCenter();
    setCenter({
      lat: newCenter.getLat(),
      lng: newCenter.getLng(),
    });
  };

  // 마커 개수에 따라 적용할 styles의 인덱스를 반환하는 함수
  // 우리 프로젝트에서는 경계값 더 크게..
  const customClusterCalculator = (size) => {
    if (size >= 30) return 6;
    if (size >= 25) return 5;
    if (size >= 20) return 4;
    if (size >= 15) return 3;
    if (size >= 10) return 2;
    if (size >= 5) return 1;
    return 0;
  };

  return (
    <div css={s.container}>
      <div css={s.title}>라이브러리를 활용한 카카오 지도</div>
      <div css={s.mapContainer}>
        {/* 좌표 객체가 있을 때 렌더링 */}
        {dummyPositions && (
          <Map
            center={center}
            style={{ width: "100%", height: "100%" }}
            level={level}
            onZoomChanged={(map) => setLevel(map.getLevel())}
            onCenterChanged={centerOnChangeHandler}
          >
            {level >= CLUSTERER_VISIBLE_MIN_LEVEL ? ( // 줌 레벨이 특정 이상일 때만 보여주기
              <MarkerClusterer
                averageCenter={true}
                minLevel={CLUSTERER_VISIBLE_MIN_LEVEL}
                calculator={customClusterCalculator}
                styles={s.customClusterStyles}
              >
                {/* 더미데이터 사용해서 position(좌표값)만 받은 거고 우리같은 경우는 feeds 받아서 쓰면 됩니다~! */}
                {dummyPositions.map((position, index) => {
                  return (
                    <CustomOverlayMap
                      key={index} // 여기는 feedId
                      // 여기는 feedLatitude, feedLongitude
                      position={{ lat: position.lat, lng: position.lng }}
                    >
                      {/* 가나디 부분 */}
                      {/* 지도 level에 따라 이미지 크기 변경~!! */}
                      <div css={s.markerContainer(level)}>
                        <img
                          // feedImgUrl
                          src="https://item.kakaocdn.net/do/f54d975d70c2916c5705a0919f193a547154249a3890514a43687a85e6b6cc82"
                          css={s.markerImg}
                        />
                      </div>
                    </CustomOverlayMap>
                  );
                })}
              </MarkerClusterer>
            ) : (
              // 더미데이터 사용해서 position(좌표값)만 받은 거고 우리같은 경우는 feeds 받아서 쓰면 됩니다~!
              dummyPositions.map((position, index) => {
                return (
                  <CustomOverlayMap
                    key={index} // 여기는 feedId
                    // 여기는 feedLatitude, feedLongitude
                    position={{
                      lat: position.lat,
                      lng: position.lng,
                    }}
                  >
                    {/* 가나디 부분 */}
                    {/* 지도 level에 따라 이미지 크기 변경~!! */}
                    <div css={s.markerContainer(level)}>
                      <img
                        // feedImgUrl
                        src="https://item.kakaocdn.net/do/f54d975d70c2916c5705a0919f193a547154249a3890514a43687a85e6b6cc82"
                        css={s.markerImg}
                      />
                    </div>
                  </CustomOverlayMap>
                );
              })
            )}
            {/* 기본 속성: TOPRIGHT */}
            {/* TOPRIGHT, TOP, TOPLEFT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT */}
            <ZoomControl />
          </Map>
        )}
      </div>
    </div>
  );
}

export default LibraryMarkerClustering;
