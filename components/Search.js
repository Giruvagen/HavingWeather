import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Search(props) {
  const [condition, setCondition] = useState();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [place, setPlace] = useState("");
  const [weatherImage, setWeatherImage] = useState();
  const [location, setLocation] = useState("Sunderland");
  const [temp, setTemp] = useState();
  const [feels, setFeels] = useState();

  const isMounted = useRef(false);

  const search = async (location) => {
    console.log(location);
    try {
      const [lat, lon, place] = await axios
        .get(
          `https://eu1.locationiq.com/v1/search.php?key=7a2e3e76046cc8&q=${location}&format=json`
        )
        .then((result) => {
          return [
            result.data[0].lat,
            result.data[0].lon,
            result.data[0].display_name,
          ];
        });
      setLat(lat);
      setLon(lon);
      setPlace(place);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const requestLocationAndSearch = async () => {
    var getLoc = new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    getLoc
      .then((position) => {
        console.log(position);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        axios
          .get(
            `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.LIQ_KEY}=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          )
          .then((result) => {
            setPlace(result.data.address.suburb);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isMounted.current) {
      try {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${process.env.OW_KEY}`
          )
          .then((result) => {
            setWeatherImage(
              `http://openweathermap.org/img/wn/${result.data.current.weather[0].icon}@4x.png`
            );
            setTemp(Math.round(result.data.current.temp) - 273);
            setCondition(result.data.current.weather[0].description);
            setFeels(Math.round(result.data.current.feels_like - 273));
            setLocation("");
          });
      } catch {}
    } else {
      isMounted.current = true;
    }
  }, [lon]);

  return (
    <div className=" w-24 flex flex-col justify-center">
      <div className="w-24">
        <input
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Enter Your Location"
          className="m-3 border-b border-blue-700 text-center"
          name="location"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(location);
            }
          }}
        />
        <button
          className="rounded m-2 p-3 bg-blue-700 text-teal-400 align-center"
          onClick={() => search(location)}
        >
          What is our weather?
        </button>
        <button
          className="rounded m-2 p-3 bg-blue-700 text-teal-400 align-center"
          onClick={() => requestLocationAndSearch()}
        >
          Use My Location
        </button>
        <img src={weatherImage} className="self-center" />
        {place.length > 0 && (
          <ul className="m-2 p-1 text-blue-700">
            <li>
              We are having {condition} weather in {place.split(",")[0]}
            </li>
            <li>Temp: {temp}C</li>
            <li>Feels like: {feels}C</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
