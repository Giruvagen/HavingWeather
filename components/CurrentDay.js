import React from 'react'

export default function CurrentDay({ day, place }) {
    console.log(day)
    return (
        <>
        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} className="self-center justify-self-center" />
          <ul className="m-2 p-1 text-blue-700 flex flex-column justify-center justify-self-center">
            <li>
              We are having {day.weather[0].description} weather in {place.split(",")[0]}
            </li>
            <li>Temp: {day.temp}C</li>
            <li>Feels Like Temp: {day.feels_like}C</li>
          </ul>
        </>
    )
}