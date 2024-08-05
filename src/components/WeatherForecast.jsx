import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import { BsCloudSun } from "react-icons/bs";
import {
  weatherFetching,
  weatherFetchSuccess,
  weatherFetchError,
} from "../reducers/weatherReducers";
import "../styles/WeatherForecast.css";
import { use } from "i18next";
export const WeatherForecast = () => {
  const [city, setCity] = useState("");
  const [lang, setLang] = useState("en");
  const weatherData = useSelector((state) => state.weather.weatherData);
  const dispatch = useDispatch();
  const textDirection = lang === "ar" ? "rtl" : "ltr";
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(city, lang);
  };
  const fetchWeatherData = async (city, lang) => {
    try {
      dispatch(weatherFetching());
      const apiKey = "57a06ba1c67cb69579dea00f89a80ddf";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${apiKey}`
      );
      const weather = {
        cityName: response.data.name,
        country: response.data.sys.country,
        temperature: Math.round(response.data.main.temp - 273.15),
        feelsLike: Math.round(response.data.main.feels_like - 273.15),
        minTemp: Math.round(response.data.main.temp_min - 273.15),
        maxTemp: Math.round(response.data.main.temp_max - 273.15),
        weatherMain: response.data.weather[0].main,
        weatherDescription: response.data.weather[0].description,
        weatherIcon: response.data.weather[0].icon,
      };
      dispatch(weatherFetchSuccess(weather));
    } catch (error) {
      console.log("Error :", error);
      dispatch(weatherFetchError(error));
    }
  };
  return (
    <div className="weather-wrapper" dir={textDirection}>
      <h3 className="weather-title">Check the weather forecast</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormControl
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={lang === "ar" ? "المدينة" : "City"}
            />
          </Col>
          <Col>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="form-control"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="ar"> العربية </option>
            </select>
          </Col>
          <Col>
            <Button type="submit" variant="outline-primary">
              {lang === "ar" ? "الحصول على الطقس" : "Get Weather"}
            </Button>
          </Col>
        </Row>
      </Form>
      {weatherData && (
        <div className="weather-info mt-3">
          <h4>{`${weatherData.cityName}, ${weatherData.country}`}</h4>
          <p>{`Temperature: ${weatherData.temperature}°C`}</p>
          <p>{`Feels Like: ${weatherData.feelsLike}°C`}</p>
          <p>{`Min: ${weatherData.minTemp}°C, Max: ${weatherData.maxTemp}°C`}</p>
          <p>
            <BsCloudSun size={22} className="mr-2" />
            {`${weatherData.weatherMain} - ${weatherData.weatherDescription}`}
          </p>
        </div>
      )}
    </div>
  );
};
export default WeatherForecast;
