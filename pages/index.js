import Nav from '../components/Nav'
import Search from '../components/Search'
import { useState } from 'react'
import {useSpring, useTransition, animated} from 'react-spring'

export default function Home() {
  const background = '../public/_01.jpeg'
  const [showNextDays, setShowNextDays] = useState(false)

  return (
    <div className="h-screen">
      <div
        className="flex flex-col h-full"
        style={{ justifyContent: "stretch" }}
      >
        <Nav />
        <div className="h-12 flex flex-auto">
          <div className="flex-auto w-8 m-2 shadow-md">
            <Search />
          </div>
          {showNextDays && 
          <>
          <div className="flex-auto w-8 m-2 shadow-md"></div>
          <div className="flex-auto w-8 m-2 shadow-md"></div>
          <div className="flex-auto w-8 m-2 shadow-md"></div>
          </>
          }
        </div>
        <div className="bg-blue-700 flex-initial h-20"></div>
      </div>
    </div>
  );
}
