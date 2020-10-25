import Nav from '../components/Nav'
import Search from '../components/Search'
import NextDay from '../components/NextDay'
import CurrentDay from '../components/CurrentDay'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function Home() {
  const background = '../public/_01.jpeg'
  const [showNextDays, setShowNextDays] = useState(false)
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [location, setLocation] = useState("Sunderland")
  const [todaysWeather, setTodaysWeather] = useState()
  const [nextDays, setNextDays] = useState([])
  const [place, setPlace] = useState("")

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
            `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.LIQ_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
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
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.OW_KEY}`
          )
					.then((result) => {
            setTodaysWeather(result.data.current)
            setNextDays(result.data.daily)
            setLocation("")
          });
      } catch {}
    } else {
      isMounted.current = true;
    }
  }, [lon]);

  const toggleDays = () => {
    setShowNextDays(!showNextDays)
  }

  return (
    <div className="h-screen">
      <div
        className="flex flex-col h-full"
        style={{ justifyContent: "stretch" }}
      >
        <Nav />
        <div className="h-12 flex flex-auto justify-self-center">
          <div className="flex-auto w-8 m-2 shadow-md justify-self-center bg-gray-300">
            {place.length > 1 && todaysWeather && (
            <>
              <CurrentDay day={todaysWeather} place={place} />
              <button onClick={() => toggleDays()}>View Next 3 Days</button>
            </>
            )}
        <label className="text-blue-700 text-lg m-3 justify-self-center">
          Location:{" "}
        </label>
        <input
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Enter Your Location"
          className="m-3 border rounded border-blue-700 text-center justify-self-center"
          name="location"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(location);
            }
          }}
        />
        <button
          className="rounded m-2 p-3 bg-blue-700 text-teal-400 justify-self-center"
          onClick={() => search(location)}
        >
          What is our weather?
        </button>
        <button
          className="rounded m-2 p-3 bg-blue-700 text-teal-400 justify-self-center"
          onClick={() => requestLocationAndSearch()}
        >
          Use My Location
        </button>
          </div>
          {showNextDays && 
          <>
            <motion.div className="flex-auto w-8 m-2 shadow-md bg-blue-300 hover:shadow-lg rounded-md" animate={{  x: 0 }} initial={{x: -1000}}
    transition={{ duration: 1 }}>
              <NextDay day={nextDays[0]} place={place}  />
            </motion.div>
            <motion.div className="flex-auto w-8 m-2 shadow-md bg-blue-700 rounded-md" animate={{  x: 0 }} initial={{x: -1500}}
    transition={{ duration: 0.9 }}>
              <NextDay day={nextDays[1]} place={place} />
          </motion.div>
            <motion.div className="flex-auto w-8 m-2 shadow-md bg-teal-400 rounded-md" animate={{  x: 0 }} initial={{x: -2000}}
    transition={{ duration: 0.8 }}>
              <NextDay day={nextDays[2]} place={place} />
          </motion.div>
          </>
          }
        </div>
        <div className="bg-blue-700 flex-initial h-20">
        </div>
      </div>
    </div>
  );
}
