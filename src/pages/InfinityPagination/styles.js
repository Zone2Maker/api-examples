import { css } from "@emotion/react";

export const container = css`
  margin: 0 auto;
  width: 600px;
  position: relative;
`;

export const header = css`
  width: 100%;
  height: 60px;
  background-color: white;
  box-shadow: 0px 5px 12px -2px rgba(134, 134, 134, 0.44);
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  line-height: 60px;
  color: #0d47a1;
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const mainContainer = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  gap: 3px;
`;

export const card = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const like = css`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: 400;

  & > svg {
    color: black;
  }
`;

export const skeleton = css`
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite ease-in-out;

  /* @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  } */
`;

export const img = (isLoaded) => css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${isLoaded ? "block" : "none"};
`;
