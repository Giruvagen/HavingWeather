import React from 'react'
import { faThermometerThreeQuarters, faThermometerQuarter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NextDay({ day, place }) {
    console.log(day)
    return (
        <>
        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} className="mx-auto border-white" />
          <ul className="p-8 text-white flex flex-col justify-items-center">
            <li>
              We will be having {day.weather[0].description} weather in {place.split(",")[0]}
          </li>
          <br />
          <li><FontAwesomeIcon className="mx-4 mt-4" size="2x" icon={faThermometerThreeQuarters} /><i className="border-4 border-white border-solid rounded-full p-2">{Math.round(day.temp.max - 273.15)} °C</i></li>
          <br />
            <li><FontAwesomeIcon className="mx-4 mt-4" size="2x" icon={faThermometerQuarter} /><i className="border-4 border-white border-solid rounded-full p-2">{Math.round(day.temp.min - 273.15)} °C</i></li>
        </ul>
        <br />
        </>
    )
}
