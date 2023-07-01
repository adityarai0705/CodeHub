import React from 'react';
import './Spinner.css';
import spinner from './spinner.png';

export default function Spinner() {
    
  return (
    <div className='spinnerContainer'>
        <img className='spinner' src={spinner} alt='Loading Animation'/>
        <h1 className='spinnerFont'>Loading</h1>
    </div>
  );
}
