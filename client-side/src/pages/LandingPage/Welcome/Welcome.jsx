import React from 'react'
import "./Welcome.css"
import CodeHubLarge from "../Assets/Logos/CodeHubLarge.png"


export default function Welcome() {
    return (
        <div id="welcomeMain">
            <div id='welcomeBoxMain'>
                <div id='welcomeMessageMain'>code?! Nahhh....<br />Tell me your approach<br />and we'll</div>
                <div id='welcomePhotoGreetMain'>
                    <img src={CodeHubLarge} alt="Code Hub" />
                </div>
            </div>
        </div>
    )
}