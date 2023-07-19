import React from 'react'
import './ButtonPlain.css'

export default function ButtonPlain(prop) {
    const redirectPage = () => {

    };
  return (
    <div className='buttonPlainContainer' onClick={redirectPage}>
        {prop.text}
    </div>
  )
}
