import { Client } from "@stomp/stompjs";
import * as s from "./styles";
import SockJS from "sockjs-client";
import { useEffect, useRef, useState } from "react";
import Input from "../../components/Input/Input";
import MessageBox from "../../components/MessageBox/MessageBox";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getChatRoomRequest } from "../../apis/chatRoomApis/chatRoomApis";
import { getUserByUsername } from "../../apis/userApis/userApis";
/** @jsxImportSource @emotion/react */

function ChatRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const user = localStorage.getItem("user");
  // client 인스턴스 저장
  const client = useRef(null);

  const [userInfo, setUserInfo] = useState({
    username: user,
  });
  const [isDisable, setIsDisable] = useState(true);
  const [text, setText] = useState("");
  const [roomInfo, setRoomInfo] = useState({
    roomId: roomId,
    roomName: "",
  });
  const [messageList, setMessageList] = useState([]);

  // WebSocket 연결 및 해제
  useEffect(() => {
    if (!client.current) {
      client.current = new Client({
        webSocketFactory: () => new SockJS("/ws-stomp"),
        reconnectDelay: 5000,
        debug: (str) => {
          console.log(str);
        },
        onConnect: () => {
          console.log("연결 성공");
          // 서버가 메시지를 보내는 주소인 '/sub/public'을 구독
          client.current.subscribe(`/sub/chat/room/${roomId}`, (message) => {
            // 한 번 열어두면 메세지 계속 받을 수 있음, 실행 로직 짜면 됨
            // console.log(message.body);
            const respData = JSON.parse(message.body);
            setMessageList((prev) => [...prev, respData.data]);
          });
          // 서버에 메시지를 보낼 때는 '/pub/**' 주소로 발행(publish)
          client.current.publish({
            destination: `/pub/join/${roomId}`,
            body: JSON.stringify({
              username: user,
            }), // 보낼 메시지 내용
          });
        },
      });

      client.current.activate(); // 활성화

      // 컴포넌트 언마운트 시 클라이언트 연결 해제
      return () => {
        client.current.deactivate();
      };
    }
  }, []);

  useEffect(() => {
    getChatRoomRequest(roomId)
      .then((resp) => {
        if (resp.data.status === "success") {
          console.log(resp.data.data);
          setRoomInfo((prev) => ({
            ...prev,
            roomName: resp.data.data.roomName,
          }));
        } else if (resp.data.status === "failed") {
          alert(resp.data.message);
        }
      })
      .catch((error) => {
        alert("문제가 발생했습니다. 다시 시도해주세요.");
        return;
      });
  }, []);

  // 로그인 유저 정보 가져오기
  useEffect(() => {
    getUserByUsername(user)
      .then((resp) => {
        if (resp.data.status === "success") {
          setUserInfo((prev) => ({ ...prev, userId: resp.data.data.userId }));
        } else if (resp.data.status === "failed") {
          alert(resp.data.message);
          navigate("/");
          return;
        }
      })
      .catch((error) => {
        alert("문제 발생");
        return;
      });
  }, []);

  // 메세지 보내는 함수
  // 메세지: 객체 형태, sender, content
  const sendMessage = (messageObj) => {
    if (client.current) {
      client.current.publish({
        destination: `/pub/chat/room/${roomId}`,
        // JSON 형태로 파싱해서 전송
        //  JSON.stringify({ sender: "me", content: "hello" }
        body: JSON.stringify(messageObj),
      });
    }
  };

  const sendBtnOnClickHandler = () => {
    setText("");
    sendMessage({
      chatRoomId: roomId,
      userId: userInfo.userId,
      content: text,
      type: "CHAT",
    });
  };

  useEffect(() => {
    setIsDisable(true);
    if (text.length > 0) {
      setIsDisable(false);
    }
  }, [text]);

  return (
    <div css={s.container}>
      <div css={s.header}>
        <h3>{roomInfo.roomName}</h3>
      </div>
      <div css={s.chatBox}>
        {messageList &&
          messageList.map((message) => {
            // 메시지 타입이 'JOIN'이거나 'LEAVE'인 경우
            if (message.type === "JOIN" || message.type === "LEAVE") {
              // 시스템 메시지는 isMine을 체크할 필요가 없음
              return <MessageBox key={message.messageId} message={message} />;
            }

            // 메시지 타입이 'CHAT'인 경우
            const isMine = message.user?.username === user;
            return (
              <MessageBox
                key={message.messageId}
                message={message}
                isMine={isMine}
              />
            );
          })}
      </div>
      <div css={s.inputContainer}>
        <div css={s.inputBox}>
          <Input text={text} setText={setText} />
        </div>
        <div css={s.btnBox}>
          <button
            css={s.sendBtn(isDisable)}
            onClick={sendBtnOnClickHandler}
            disabled={isDisable}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
