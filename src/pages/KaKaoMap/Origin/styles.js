import { css } from "@emotion/react";

export const container = css`
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  & > h2 {
    margin: 0;
    font-size: 20px;
  }
`;

export const subContainer = css`
  width: 900px;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const left = css`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const top = css`
  width: 100%;
  display: flex;
`;

export const searchInput = css`
  flex-grow: 1;
  outline: none;
  padding: 8px 16px;
  margin-right: 15px;
  font-size: 16px;
  border: 1px solid #191919;
  border-radius: 15px;
  box-sizing: border-box;
`;

export const searchBtn = css`
  font-size: 16px;
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  background-color: #fee500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: #e4c903;
  }
`;

export const menu_wrap = css`
  width: 100%;
  height: 530px;
  overflow-y: auto;
  scrollbar-width: thin;
`;

export const placesList = css`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > li {
    padding: 15px;
    border-top: 1px solid #dbdbdb;
    cursor: pointer;

    &:hover {
      background-color: aliceblue;
    }
  }
`;

export const info = css`
  display: flex;
  flex-direction: column;
  font-size: 13px;
`;

export const header = css`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  & > h5 {
    margin: 0;
    margin-bottom: 4px;
    padding: 0;
    font-weight: 400;
    font-size: 17px;
  }

  & > span {
    font-size: 12px;
    color: #888;
  }
`;

export const pagination = css`
  width: 100%;
  height: 50px;
  padding: 0 7px;
  box-sizing: border-box;
  background-color: aqua;
`;

export const right = css`
  width: 500px;
  height: 100%;
  padding: 50px 0;
  box-sizing: border-box;
`;

export const map = css`
  width: 100%;
  height: 500px;
  box-sizing: border-box;
`;
