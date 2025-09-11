import { useCallback, useEffect, useRef, useState } from "react";
import * as s from "./styles.js";
import Card from "./Card.jsx";

/** @jsxImportSource @emotion/react */
function InfinityScroll() {
  const size = 12;

  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // 더미데이터 이미지 100개 생성
  const dummyData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    content: `https://picsum.photos/id/${i}/350/350`,
    likes: Math.floor(Math.random() * 1000),
  }));

  const fetchItems = useCallback(() => {
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지
    setLoading(true);

    // API 호출 시뮬레이션
    setTimeout(() => {
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const newItems = dummyData.slice(startIndex, endIndex);

      // 새로 불러온 데이터가 한 페이지 사이즈보다 작으면 마지막 페이지로 판단
      if (newItems.length < size) {
        setHasMore(false); // 더 이상 불러올 데이터가 없음
      }

      setFeeds((prev) => [...prev, ...newItems]);
      setLoading(false);
      setPage((prev) => prev + 1);
    }, 300);
  }, [page, loading, hasMore]); // page와 loading 상태가 바뀔 때만 함수가 다시 생성되도록 의존성 배열 추가

  useEffect(() => {
    // 최초 렌더링 시 첫 페이지 데이터 불러오기
    fetchItems();
  }, []);

  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // target이 뷰포트에 보일 때 데이터를 더 불러옴
          fetchItems();
        }
      },
      { threshold: 1.0 } // ?
    );

    observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.disconnect();
      }
    };
  }, [loading, fetchItems]); // loading, fetchItems가 바뀔 때 옵저버 다시 설정

  return (
    <div css={s.container}>
      <header css={s.header}>RunnersHigh</header>
      <main css={s.mainContainer}>
        {feeds.map((feed, index) => (
          <Card key={index} feed={feed} />
        ))}
      </main>
      {loading && hasMore && <div>불러오는 중..</div>}
      {/* 얘가 화면에 보이면 함수 호출 */}
      <div ref={observerTarget}></div>
    </div>
  );
}

export default InfinityScroll;
