import { css } from "@emotion/react";

export const container = css`
  width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div {
    font-size: 20px;
  }
`;
