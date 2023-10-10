import React, { useState } from 'react'
import "./NavBar.css";
import CodeTogetherSingleLine from "./Assets/Logos/CodeTogetherSingleline.png";
import CodeTogetherLogo from "./Assets/Logos/CodeTogetherLogo.png";
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const navigate = useNavigate();

    //FUNCTION FOR MENU
    const onClickMenu = () => {
        const body = document.getElementsByTagName("BODY")[0];
        if (body.style.overflow !== "hidden") {
            body.style.height = "100vh";
            body.style.overflow = "hidden";
        }
        else {
            body.style.height = "auto";
            body.style.overflow = "auto";
        }
        document.getElementById("navItemsMain").classList.toggle("navChangedMain");
    }

    //FUNCTION FOR SCROLL
    const scroll = (target) => {
        const section = document.querySelector(`#${target}`);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };



    return (
        <>

            {/* --------------HTML FOR DESKTOP EXPERIENCE---------------- */}
            <div id='navBar1Main'>
                <div id='navBar11Main'>
                    <img onClick={() => navigate("/")} src={CodeTogetherSingleLine} alt="Code Together" />
                </div>
                <div id='navBar12Main'>
                    <button onClick={() => scroll("welcomeMain")} className='navBar121Main'>
                        Home
                    </button>
                    <button onClick={() => scroll("aboutUsMain")} className='navBar121Main'>
                        About Us
                    </button>
                    <button onClick={() => scroll("teams3Main")} className='navBar121Main'>
                        Teams
                    </button>
                    <button onClick={() => scroll("motiveMain")} className='navBar121Main'>
                        Motive
                    </button>
                    <button onClick={() => scroll("achievementsMain")} className='navBar121Main'>
                        Achievments
                    </button>
                    <button onClick={() => scroll("ourEventsMain")} className='navBar121Main'>
                        Events
                    </button>
                    <button onClick={() => navigate("/notice-board")} className='navBar121Main'>
                        Notice Board
                    </button>
                    <button onClick={() => navigate("/login")} id='navBar122Main'>
                        Login
                    </button>
                </div>
            </div>
            {/* ---------------------END---------------------- */}

            {/* -----------------HTML FOR MOBILE/TABLET EXPERIENCE--------------- */}
            <div id='navBar2Main'>
                <div>
                    <button onClick={() => navigate("/")} id='navBar21Main'>
                        Login
                    </button>
                </div>
                <div id='navBar22Main'>
                    <img id='navBarLogo1Main' src={CodeTogetherSingleLine} alt="Code Together" />
                    <img id='navBarLogo2Main' src={CodeTogetherLogo} alt="Code Together" />
                </div>
                <div id="navigation">
                    <button id='navBar23Main' onClick={() => onClickMenu()}>
                        Explore
                    </button>
                    <ul className="navItemsMain" id="navItemsMain" onClick={() => onClickMenu()}>
                        <div id='navCloseMain'>
                            <div id='navCloseMain' className='gg-close'></div>
                        </div>
                        <li onClick={() => scroll("welcomeMain")}>Home</li>
                        <li onClick={() => scroll("aboutUsMain")} >About Us</li>
                        <li onClick={() => scroll("teams3Main")}>Teams</li>
                        <li onClick={() => scroll("motiveMain")}>Motive</li>
                        <li onClick={() => scroll("achievementsMain")}>Achievments</li>
                        <li onClick={() => scroll("ourEventsMain")}>Events</li>
                        <li onClick={() => navigate("/notice-board")}>Notice Board</li>
                    </ul>
                </div>
            </div >
            {/* ---------------------END---------------------- */}
        </>
    )
}