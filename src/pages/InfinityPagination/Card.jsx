import { useEffect, useState } from "react";
import * as s from "./styles.js";
import { FaHeart } from "react-icons/fa";

/** @jsxImportSource @emotion/react */
function Card({ feed }) {
  // 이미지가 로드되었는지
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div css={s.card}>
      {/* 스켈레톤 */}
      {!isLoaded && <div css={s.skeleton}></div>}
      <img
        src={feed.content}
        alt=""
        onLoad={() => {
          setIsLoaded(true);
        }}
        css={s.img(isLoaded)}
      />
      {/* 이미지가 로딩되었을 때 아이콘 렌더링 */}
      {isLoaded && (
        <div css={s.like}>
          <FaHeart />
          <span> {feed.likes}</span>
        </div>
      )}
    </div>
  );
}

export default Card;
