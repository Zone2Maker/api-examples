import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
`;

export const mapContainer = css`
  width: 600px;
  height: 600px;
`;

export const title = css`
  font-size: 40px;
`;

// 모든 마커 클러스터에 적용할 공통 스타일
const clusterCommonStyles = {
  color: "white",
  fontWeight: 600,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.2s ease", // 부드러운 효과

  "&:hover": {
    transform: "scale(1.1)",
  },
};

// 마커 클러스터 커스텀 디자인
// 달라지는 스타일만 따로 정의해두기
export const eachClusterStyles = [
  {
    width: "24px",
    height: "24px",
    lineHeight: "24px",
    backgroundColor: "red",
    fontSize: "12px",
  },
  {
    width: "26px",
    height: "26px",
    lineHeight: "26px",
    backgroundColor: "orange",
    fontSize: "14px",
  },
  {
    width: "28px",
    height: "28px",
    lineHeight: "28px",
    backgroundColor: "gold",
    fontSize: "16px",
  },
  {
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    backgroundColor: "green",
    fontSize: "18px",
  },
  {
    width: "32px",
    height: "32px",
    lineHeight: "32px",
    backgroundColor: "blue",
    fontSize: "20px",
  },
  {
    width: "40px",
    height: "40px",
    lineHeight: "40px",
    backgroundColor: "purple",
    fontSize: "28px",
  },
];

// map 돌려서 합치기
export const customClusterStyles = eachClusterStyles.map((style) => ({
  ...clusterCommonStyles,
  ...style,
}));

export const markerContainer = (level) => css`
  width: ${level === 1
    ? "62px"
    : level === 2
    ? "60px"
    : level === 3
    ? "58px"
    : level === 4
    ? "56px"
    : level === 5
    ? "54px"
    : level === 6
    ? "52px"
    : level === 7
    ? "50px"
    : level === 8
    ? "48px"
    : level === 9
    ? "46px"
    : level === 10
    ? "44px"
    : "42px"};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #efefef;
  background-color: #c7ddffff;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.2);
  }
`;

export const markerImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
