import React from 'react';
import './Alert.css';

export default function Alert(props) {
  return (
    <div className='AlertContainer'>
        <div className='AlertCard'>
            <h2 className='textAlert'>
                {props.heading}
            </h2>
            <p className='textAlert'>
                {props.body}
            </p>
            <div className='tryAgain' onClick={ () => {window.location.reload()}}>Try again</div>
        </div>
    </div>
  )
}
