import { css } from "@emotion/react";

export const textInput = css`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 10px;
  padding-right: 0px;
  box-sizing: border-box;
  border: none;
  font-size: 14px;
  color: #333;
  resize: none;
  font-family: inherit;
  /* overflow-y: auto; */
  background-color: #f9f9f9ff;

  &:focus {
    outline: none;
  }
`;
