import { css } from "@emotion/react";

export const container = css`
  margin: 0 auto;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f9f9f9ff;
  border: 1px solid #dbdbdb;
  box-shadow: 0px 0px 3px 0px rgba(148, 148, 148, 0.8);
`;

export const header = css`
  padding: 20px 15px;
  display: flex;
  justify-content: flex-start;
  background-color: #fdcabcff;
  position: sticky;

  & > h3 {
    margin: 0;
  }
`;

export const chatBox = css`
  width: 100%;
  height: 500px;
  background-color: #fdcabcff;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #b4b4b4ff #fdcabcff;
`;

export const inputContainer = css`
  width: 100%;
  min-height: 100px;
  max-height: 40%;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
`;

export const inputBox = css`
  width: 100%;
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cfcfcfff #f9f9f9ff;
`;

export const btnBox = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  padding-top: 5px;
  box-sizing: border-box;
`;

export const sendBtn = (isDisable) => css`
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 6px;
  border: none;
  background-color: ${isDisable ? "#d8d8d8ff" : "#fd8463ff"};
  color: ${isDisable ? "#858585ff" : "#f3f1f1ff"};
  cursor: ${isDisable ? "" : "pointer"};
`;
