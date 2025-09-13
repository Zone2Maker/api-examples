import * as s from "./styles";
/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";

function Input({ text, setText }) {
  const textareaRef = useRef();

  useEffect(() => {
    handleTextareaHeight();
  }, [text]);

  const handleTextareaHeight = () => {
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      // 높이를 'auto'로 초기화해서 정확한 scrollHeight를 얻기
      textareaRef.current.style.height = "auto";
      // 스크롤 높이만큼 높이 설정
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <textarea
      type="text"
      value={text}
      css={s.textInput}
      placeholder="메시지를 입력해주세요."
      onChange={(e) => {
        setText(e.target.value);
      }}
      ref={textareaRef}
      rows={1}
    />
  );
}

export default Input;
