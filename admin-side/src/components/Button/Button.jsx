import React from 'react'
import './Button.css'

export default function Button(prop) {

  return (
    <div className='Button' style={{backgroundColor : prop.col, border :' 1px solid' + prop.col}}>{prop.text}</div>
  )
}
