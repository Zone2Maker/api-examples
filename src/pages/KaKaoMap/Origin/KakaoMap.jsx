import { useEffect, useRef, useState } from "react";
import * as s from "./styles.js";

/** @jsxImportSource @emotion/react */
function KakaoMap() {
  const { kakao } = window;
  // 마커 담을 배열
  const [markers, setMarkers] = useState([]);
  // 지도
  const [map, setMap] = useState(null);
  // 검색 객체
  const [keywordPs, setKeywordPs] = useState(null);
  // 마커 클릭 시 정보 보여줄 인포윈도우
  const [infoWindow, setInfoWindow] = useState(null);

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState("");
  // 검색 결과를 담을 배열
  const [searchResult, setSearchResult] = useState([]);
  // 지도가 들어갈 컨테이너
  const mapContainerRef = useRef(null); // useRef 훅으로 ref 객체 생성

  useEffect(() => {
    // .env 파일에 VITE_KAKAO_API_KEY=각자의 API 키..
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

    const script = document.createElement("script"); // script 태그 동적 생성
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`; // autoload=false가 중요!
    script.async = true;

    // script 태그를 document.head에 추가
    document.head.appendChild(script);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const curLat = position.coords.latitude;
        const curLng = position.coords.longitude;

        console.log("현재 위치:", curLat, curLng);

        // 카카오 객체가 있는지 확인
        if (typeof window.kakao !== "undefined" && mapContainerRef.current) {
          // 지도 객체 담을 컨테이너
          const container = document.querySelector("#map");
          // 지도, 검색 객체 -> 최초 렌더링 시 한 번만 생성
          window.kakao.maps.load(() => {
            const options = {
              // 지도의 중심 좌표
              center: new window.kakao.maps.LatLng(curLat, curLng),
              level: 4, //
            };

            const newMap = new kakao.maps.Map(container, options);
            const newKeywordPs = new kakao.maps.services.Places();
            const newInfoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

            setMap(newMap);
            setKeywordPs(newKeywordPs);
            setInfoWindow(newInfoWindow);
          });
        }
      });
    }
  }, [mapContainerRef]);

  // 검색할 때마다 지도 재렌더링
  useEffect(() => {
    if (map && searchResult.length > 0) {
      // 지도에 표시되고 있는 마커 제거(초기화)
      removeMarker();

      // 마커 생성 및 이벤트 리스너 추가
      // 마커 생성 및 이벤트 리스너 추가
      const newMarkers = searchResult.map((place, index) => {
        // 1. 카카오 지도 API로 마커 생성
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = addMarker(position, index);

        // 2. 이벤트리스너 추가

        // 검색 결과 목록 또는 마커에 마우스를 올렸을 때 호출되는 함수
        // 싫으면 이벤트리스너 등록 안하면 됨
        // 인포윈도우에 장소명 표시
        // 다른 것도 표시하고 싶으면 여기서 콘텐츠 수정
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          const content = `<div css={s.infoWindow}>${place.place_name}</div>`;

          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });

        // 마우스 딴 데로 옮겼을 때
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infoWindow.close();
        });

        // 3. 생성된 마커 객체 반환
        return marker;
      });

      // 새로운 마커 배열을 상태에 저장
      setMarkers(newMarkers);

      // 검색된 장소 위치를 기준으로 지도 범위 재설정 위해서
      // LatLngBounds 객체에 좌표 추가
      const bounds = new window.kakao.maps.LatLngBounds();
      searchResult.forEach((place) => {
        const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
        bounds.extend(placePosition);
      });
      map.setBounds(bounds);
    }
  }, [searchResult, map]);

  const searchKeywordOnChangeHandler = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  // 키워드로 장소 검색
  const searchWithKeyword = () => {
    console.log(searchKeyword);

    if (!searchKeyword.replace(/^\s+|\s+$/g, "")) {
      alert("검색어를 입력해주세요.");
      return false;
    }

    // 장소 검색 객체를 통해 키워드로 장소 검색 요청
    keywordPs.keywordSearch(searchKeyword, placeSearchCB);
  };

  // 장소 검색 완료 시 호출되는 콜백 함수
  const placeSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(data);
      // 검색 결과를 상태로 저장
      // 이 상태를 가지고 map 돌려서 UI 그리기
      setSearchResult(data);
      // 페이지 번호 표출 => 안써용
      //   displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  // 마커를 생성하고 지도 위에 마커 표시하는 함수
  const addMarker = (position, idx, title) => {
    // 마커 이미지 url, 스프라이트 이미지를 씁니다
    // 스프라이트: 여러 이미지를 하나의 큰 이미지 파일에 합쳐놓은 것
    // 0번부터 15번까지의 파란색 숫자 마커 이미지 들어있음
    // 마커 이미지 하나의 크기 지정해두고 인덱스에 따라 잘라쓰는 것
    // 그니까 마커 다른 거 사용하고 싶으면 내가 마커 이미지 스프라이트로 만들어서 쓰면 됨..
    // 아니면 전부 똑같은 마커 사용하고 싶으면 마커 이미지 파일 하나로
    // MarkerImage 사용할 때 imgSrc에 경로, imgSize에 크기만 지정해주면 됨
    let imgSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 링크 들어가서 확인 ㄱㄱ
      imgSize = new window.kakao.maps.Size(36, 37), // 마커 크기
      imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표, 이미지 크기도 있으므로 잘라서 쓸 수 있게됨
        offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new window.kakao.maps.MarkerImage(
        imgSrc,
        imgSize,
        imgOptions
      ),
      marker = new window.kakao.maps.Marker({
        // 마커 생성
        position: position, // 마커 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도에 마커 표출
    // 배열에 생성된 마커 추가
    setMarkers((prev) => [...prev, marker]);

    return marker;
  };

  // 지도 위에 표시된 마커 모두 제거하는 함수(초기화)
  const removeMarker = () => {
    // 각각의 마커를 지도에서 없애기
    markers.map((marker) => {
      marker.setMap(null);
    });
    // 배열 초기화 / 마커 객체 목록 비우기
    setMarkers([]);
  };

  const itemOnClickHandler = (e) => {
    // 텍스트를 클릭하면 그 텍스트의 DOM 요소가 반환됨
    // event가 일어난 요소에서 가장 가까운 li 태그를 찾기
    const target = e.target;
    const closestLi = target.closest("li");
    const loc = closestLi.dataset.loc; // string
    const lat = loc.split(",")[0],
      lng = loc.split(",")[1];

    console.log("위도: ", lat, "경도: ", lng);
    // 이제 가져올 수 있으니까 상태값에 넣든 뭘 하든 할 수 잇음
  };

  return (
    <div css={s.container}>
      <h2>검색해서 목록으로 나타내기</h2>
      <div css={s.subContainer}>
        <div css={s.left}>
          <div css={s.top}>
            <input
              placeholder="장소, 주소 검색"
              value={searchKeyword}
              onChange={searchKeywordOnChangeHandler}
              css={s.searchInput}
            />
            <button onClick={searchWithKeyword} css={s.searchBtn}>
              검색
            </button>
          </div>
          <div css={s.menu_wrap}>
            <ul css={s.placesList}>
              {/* places객체 속성
                place_name, address_name, road_address_name,
                phone, category_name, place_url, x, y, id */}
              {searchResult &&
                searchResult.map((place) => {
                  const category = place.category_name.split(" > ");
                  return (
                    <li
                      key={place.id}
                      data-loc={[place.x, place.y]}
                      onClick={itemOnClickHandler}
                    >
                      <span className="markerbg marker_${index + 1}"></span>
                      <div css={s.info}>
                        <div css={s.header}>
                          <h5>{place.place_name}</h5>
                          <span>
                            {place.category_group_name
                              ? place.category_group_name
                              : category[category.length - 1]}
                          </span>
                        </div>
                        {/* 도로명 주소 있으면 도로명 주소 아니면 일반 주소 */}
                        <div>
                          {place.road_address_name
                            ? place.road_address_name
                            : place.address_name}
                        </div>
                        <div css={s.phone}>{place.phone}</div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {/* <!-- 필요없을 듯? --> */}
          <div id="pagination" css={s.pagination}></div>
        </div>
        <div css={s.right}>
          <div id="map" ref={mapContainerRef} css={s.map}></div>
        </div>
      </div>
    </div>
  );
}

export default KakaoMap;
