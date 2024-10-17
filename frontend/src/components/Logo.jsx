import React from 'react'
import logo from "./images/logo.jpeg"

export default function Logo() {
  return (
    <img 
      src={logo} 
      alt="Logo" 
      className="h-9 w-9 rounded-full border border-gray-300"
    />
  )
}
