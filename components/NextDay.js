import React from 'react'

export default function NextDay({ day, place }) {
    console.log(day)
    return (
        <>
        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} className="self-center" />
          <ul className="m-2 p-1 text-blue-700">
            <li>
              We are having {day.weather[0].description} weather in {place.split(",")[0]}
            </li>
            <li>Daytime Max Temp: {day.temp.max}C</li>
            <li>Nightime Min Temp: {day.temp.min}C</li>
          </ul>
        </>
    )
}
