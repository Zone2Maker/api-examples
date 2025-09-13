import { css } from "@emotion/react";

export const serverMessageBox = css`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;

  & > span {
    padding: 3px 8px;
    border-radius: 8px;
    font-size: 12px;
    background-color: rgba(131, 131, 131, 0.5);
  }
`;

export const messageBox = (isMine) => css`
  margin: 12px;
  display: flex;
  justify-content: ${isMine ? "flex-end" : "flex-start"};
  align-items: flex-end;
  font-size: 15px;
  color: #1a1919ff;
  position: relative;
`;

export const start = (isMine) => css`
  width: 45px;
  padding-top: 4px;
  display: flex;
  align-items: flex-start;
  margin-left: ${isMine ? "10px" : "0px"};
  margin-right: ${isMine ? "0px" : "10px"};
`;

export const profileImg = css`
  width: 100%;
  height: 45px;
  border-radius: 20px;
  overflow: hidden;
  object-fit: cover;
`;

export const center = (isMine) => css`
  display: flex;
  flex-direction: column;
  align-items: ${isMine ? "flex-end" : "flex-start"};
  gap: 2px;
`;

export const sender = css`
  font-size: 14px;
`;

export const message = css`
  max-width: 210px;
  text-align: left;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: white;
`;

export const end = (isMine) => css`
  display: flex;
  justify-content: end;
  align-items: flex-end;
  font-size: 10px;
  margin-right: ${isMine ? "3px" : "0px"};
  margin-left: ${isMine ? "0px" : "3px"};

  & > p {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
