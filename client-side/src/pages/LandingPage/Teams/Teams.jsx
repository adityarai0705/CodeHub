import React from 'react';
import "./Teams.css";
import { useNavigate } from 'react-router-dom';

export default function Teams() {

    const navigate = useNavigate();
    
    return (
        <div id='teams1Main'>
            <div id='teams2Main'>
                <div id='teams3Main'>
                    <div id='teamsTitleMain'>
                        Teams
                    </div>
                    <div id='teamsFlexContainer'>
                        <div id='teamsContentMain'>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Admins</p>
                            </div>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Representatives</p>
                            </div>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Design Team</p>
                            </div>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Web Team</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}