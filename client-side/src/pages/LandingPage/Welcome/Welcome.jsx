import React from 'react'
import "./Welcome.css"
import CodeTogetherLarge from "../Assets/Logos/CodeTogetherLarge.png"


export default function Welcome() {
    return (
        <div id="welcomeMain">
            <div id='welcomeBoxMain'>
                <div id='welcomeMessageMain'>code?! Nahhh....<br />Tell me your approach<br />and we'll</div>
                <div id='welcomePhotoGreetMain'>
                    <img src={CodeTogetherLarge} alt="Code Together" />
                </div>
            </div>
        </div>
    )
}