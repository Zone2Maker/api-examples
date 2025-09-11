import { useEffect, useState } from "react";
import * as s from "./styles.js";
import axios from "axios";

/** @jsxImportSource @emotion/react */
function WeatherApi() {
  // https://openweathermap.org/current
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const [coords, setCoords] = useState({});
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // 현재 위치 위경도값 가져오기~!
    const fetchWeather = async (lat, lng) => {
      try {
        // API 요청 URL 생성
        const url = `${API_BASE_URL}?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&lang=kr&units=metric`;
        // 한글, 섭씨

        // get요청 날리기
        const response = await axios.get(url);
        console.log(response.data);
        setWeather(response.data);

        /**
         * main 
            feels_like : 295.69 // 체감 온도(바람, 습도 고려한 값)
            humidity : 79   // 습도 (%)
            pressure : 1016 // 대기압 (hPa)
            temp : 295.35   // 현재 기온, (기본 단위: Kelvin)
            temp_max : 295.35 // 최고 기온
            temp_min : 295.35 // 최저 기온
         */

        /**
         * 날씨 종류
         * https://injunech.tistory.com/178
         * https://peter-codinglife.tistory.com/70
         * clear sky, few clouds, scattered clouds, broken clouds, shower rain, rain, thunderstorm, snow, mist
         */
      } catch (error) {
        console.log("날씨 정보를 가져오는 데 실패했습니다.", error);
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(lat, lng);
        setCoords({ lat, lng });

        fetchWeather(lat, lng);
      });
    }
  }, []);

  const weatherLabels = {
    temp: "현재 기온",
    feels_like: "체감 기온",
    temp_min: "최저 기온",
    temp_max: "최고 기온",
    pressure: "기압(hPa)",
    humidity: "습도(%)",
  };

  return (
    <div css={s.container}>
      <h1>날씨 API TEST</h1>
      <div>현재 위치는.. </div>
      <div>위도: {coords.lat}</div>
      <div>경도: {coords.lng}</div>
      <div>---------------------------------</div>
      <div>현재 날씨는.. {weather?.weather[0].description}</div>
      <div>현재 기온은.. {weather?.main.temp}'C</div>
      {/* For code 500 - light rain icon = "10d". See below a full list of codes
        URL is https://openweathermap.org/img/wn/10d@2x.png */}
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
        alt="날씨 아이콘"
      />
    </div>
  );
}

export default WeatherApi;
