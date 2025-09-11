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
        const url = `${API_BASE_URL}?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;

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
         * 
         * 
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

  // Kelvin -> 섭씨 변환 함수
  // temp: 295.35 -> 22.2'C
  const kelvinToCelcius = (k) => (k - 273.15).toFixed(1);

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
      <div>현재 위치는..</div>
      <div>위도: {coords.lat}</div>
      <div>경도: {coords.lng}</div>
      <div>---------------------------------</div>
      <div>현재 날씨는.. {weather?.weather[0].main}</div>
      <div>현재 기온은.. {kelvinToCelcius(weather.main.temp)}'C</div>
    </div>
  );
}

export default WeatherApi;
