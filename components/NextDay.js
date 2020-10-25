import React from 'react'

export default function NextDay({ day, place }) {
    console.log(day)
    return (
        <>
        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} className="mx-auto" />
          <ul className="m-2 p-1 text-white flex flex-col justify-items-center">
            <li>
              We will be having {day.weather[0].description} weather in {place.split(",")[0]}
            </li>
            <li>Daytime Max Temp: {Math.round(day.temp.max - 273.15)}C</li>
            <li>Nighttime Min Temp: {Math.round(day.temp.min - 273.15)}C</li>
          </ul>
        </>
    )
}
