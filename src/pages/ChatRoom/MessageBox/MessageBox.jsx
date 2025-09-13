/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import defaultImg from "../../assets/profileImg/default.png";

function MessageBox({ message, isMine }) {
  return message.user?.userId === 1 ? ( // 서버
    <>
      <div css={s.serverMessageBox}>
        <span>{message.content}</span>
      </div>
    </>
  ) : (
    <>
      <div css={s.messageBox(isMine)}>
        {/* 내가 보낸 메시지면 우측 정렬, 아니면 좌측 정렬 */}
        {isMine ? (
          <>
            <div css={s.end(isMine)}>
              <p>{message.createDt.split("T")[1].substring(0, 5)}</p>
            </div>
            <div css={s.center(isMine)}>
              <span css={s.sender}>{message.user?.username}</span>
              <div css={s.message}>{message.content}</div>
            </div>
            <div css={s.start(isMine)}>
              <img src={defaultImg} css={s.profileImg} />
            </div>
          </>
        ) : (
          <>
            <div css={s.start(isMine)}>
              <img src={defaultImg} css={s.profileImg} />
            </div>
            <div css={s.center(isMine)}>
              <span css={s.sender}>{message.user?.username}</span>
              <div css={s.message}>{message.content}</div>
            </div>
            <div css={s.end(isMine)}>
              <p>{message.createDt.split("T")[1].substring(0, 5)}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MessageBox;
