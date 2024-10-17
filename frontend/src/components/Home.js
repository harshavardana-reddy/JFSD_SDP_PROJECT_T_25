import React from 'react'
import HomeIMG from "./images/home_page.png"
import "./style.home.css"

export default function Home() {
  return (
    <div>
      <div className='max-w-[1200px] w-full h-[800px] mx-auto text-center flex flex-col justify-center'>
        <div className='flex items-center justify-between'>
          <h1 className='text-6xl font-bold text-left slide-in'>
            Online Assignments <br />
            Submission & <br />
            grading system
          </h1>

          <img className='w-[500px] mx-auto my-4 float' src={HomeIMG} alt="/" />
        </div>
      </div>
    </div>
  )
}
