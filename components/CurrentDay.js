import React from 'react'
import { faThermometerThreeQuarters, faThermometerQuarter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CurrentDay({ day, place }) {
    console.log(day)
    return (
        <>
          <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} className="mx-auto" />
          <p className="mx-auto px-8 py-8">We are having {day.weather[0].description} weather in {place.split(",")[0]}</p>
          <ul className="mx-auto px-8 text-blue-700 flex flex-col justify-center justify-self-center">
          <li><FontAwesomeIcon className="mx-4 mt-4" size="2x" icon={faThermometerThreeQuarters} /><i className="border-4 border-white border-solid rounded-full p-2">{Math.round(day.temp - 273.15)} °C</i></li>
          <br />
          <li><FontAwesomeIcon className="mx-4 mt-4" size="2x" icon={faThermometerQuarter} /><i className="border-4 border-white border-solid rounded-full p-2">{Math.round(day.feels_like - 273.15)} °C</i></li>
          </ul>
        </>
    )
}