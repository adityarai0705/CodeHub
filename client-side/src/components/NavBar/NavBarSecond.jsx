import React, { useState,useContext } from 'react'
import "./NavBar.css";
import CodeTogetherSingleLine from "./Assets/Logos/CodeTogetherSingleline.png";
import CodeTogetherLogo from "./Assets/Logos/CodeTogetherLogo.png";
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../loginContext';


export default function NavBarSecond() {

    const navigate = useNavigate();

      //USER-LOGIN INFO
      const {login,userCfID} = useContext(loginContext);
      console.log(login)  

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
                   {login && <><button onClick={() =>{navigate(`/user-home/${userCfID}`)}} className='navBar121Main'>
                        Profile
                    </button>
                    <button onClick={() => navigate("/leader-board")} className='navBar121Main'>
                        Leader Board
                    </button>
                    <button onClick={() => navigate("/education")} className='navBar121Main'>
                        Education
                    </button></>}
                    <button onClick={() => navigate("/notice-board")} className='navBar121Main'>
                        Notice Board
                    </button>
                    <button onClick={() => navigate("/login")} id='navBar122Main'>
                       {login ? "Logout" : "Login"} 
                    </button>
                </div>
            </div>
            {/* ---------------------END---------------------- */}

            {/* -----------------HTML FOR MOBILE/TABLET EXPERIENCE--------------- */}
            <div id='navBar2Main'>
                <div>
                    <button onClick={() => navigate("/login")} id='navBar21Main'>
                    {login ? "Logout" : "Login"} 
                    </button>
                </div>
                <div id='navBar22Main'>
                    <img id='navBarLogo1Main' src={CodeTogetherSingleLine} alt="Code Together" />
                    <img id='navBarLogo2Main' src={CodeTogetherLogo} alt="Code Together" />
                </div>
                {login && <div id="navigation">
                    <button id='navBar23Main' onClick={() => onClickMenu()}>
                        Explore
                    </button>
                    <ul className="navItemsMain" id="navItemsMain" onClick={() => onClickMenu()}>
                        <div id='navCloseMain'>
                            <div id='navCloseMain' className='gg-close'></div>
                        </div>
                        <li className='text-dg' onClick={() => navigate(`/user-home/${userCfID}`)}>Profile</li>
                        <li className='text-dg' onClick={() => navigate("/leader-board")} >Leader Board</li>
                        <li className='text-dg' onClick={() => navigate("/education")}>Education</li>
                        <li className='text-dg' onClick={() => navigate("/notice-board")}>Notice Board</li>
                        {/* <li onClick={() => navigate("/demoLink")}>Home</li>
                        <li onClick={() => navigate("/demoLink")} >Leader Board</li>
                        <li onClick={() => navigate("/demoLink")}>Education</li>
                        <li onClick={() => navigate("/demoLink")}>Notice Board</li> */}
                    </ul>
                </div>}
            </div >
            {/* ---------------------END---------------------- */}
        </>
    )
}