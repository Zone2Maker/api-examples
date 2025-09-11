import { useState } from "react";
import Calendar from "react-calendar";
import * as s from "./styles.js";
// import "react-calendar/dist/Calendar.css"; // 달력의 기본 스타일
// 커스텀하고 싶으면 기본 스타일 import 하지말고 커스텀 css 파일 import
import "./customCalendar.css";
import moment from "moment";
import { FaHeart } from "react-icons/fa";

/** @jsxImportSource @emotion/react */
function MyCalendar() {
  // 화면 렌더링 시 useEffect 실행할 때 new Date()로 오늘 날짜 생성하고
  // getFullYear, getMonth로 년, 월 뽑아내서 user_id랑 같이
  // 요청으로 db에서 가져오면 될 듯 합니당.
  const [diary, setDiary] = useState([
    "2025-09-07",
    "2025-09-02",
    "2025-09-05",
  ]);

  const [date, setDate] = useState(new Date());
  const today = new Date();
  const curYear = today.getFullYear();
  const curMonth = today.getMonth();

  const lastDayOfCurMonth = new Date(curYear, curMonth + 1, 0);

  // 특정 날짜 클릭 시 실행하는 함수
  const dateOnChangeHandler = (date) => {
    setDate(date);
    console.log("선택한 날짜: " + date);
    // 선택한 날짜: Mon Sep 01 2025 00:00:00 GMT+0900 (한국 표준시)

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric", // 연도
      month: "long", // 월 (예: 9월)
      day: "numeric", // 일
      weekday: "long", // 요일 (예: 월요일)
    }).format(date);
    console.log("변환: " + formattedDate);
  };

  // 타일 컨텐츠 커스텀 함수
  // 즉 날짜 커스텀 함수
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      console.log(formattedDate);

      if (diary.includes(formattedDate)) {
        // 해당 날짜에 작성한 글이 있으면
        return (
          <div className="icon-wrapper">
            <FaHeart />
          </div>
        );
      }
    }
    return null;
  };

  // npm install react-calendar
  return (
    <div css={s.container}>
      <h1>React Calendar</h1>
      <div css={s.calendar}>
        <Calendar
          // locale="ko-KR" // 요일/월 한국어로
          onChange={dateOnChangeHandler}
          value={date}
          maxDate={lastDayOfCurMonth} // 날짜 범위 제한, (min, max)Date
          view="month" // 월별, 연도별 보기 year, month
          onViewChange={({ view }) => console.log("월 바뀜")}
          calendarType="hebrew" // 주의 시작 월요일
          formatDay={(locale, date) => moment(date).format("DD")} // 일 떼기
          tileContent={tileContent} // 타일 컨텐츠 커스텀, 위에서 함수 만들어서 넣어주면 될 듯
        />
      </div>
    </div>
  );
}
export default MyCalendar;
// https://github.com/wojtekmaj/react-calendar
// https://velog.io/@makeacalendar/react
