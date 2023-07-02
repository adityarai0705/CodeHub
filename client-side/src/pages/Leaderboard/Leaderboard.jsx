import React, { useEffect, useState } from 'react';
import '../pages.css';
import './Leaderboard.css';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';


function LeaderUser(props){
    return (
        <div>
        <div className="leader-box">
            <div className=''>
                <span style={{marginRight : '5px'}}>
                    {props.rank}
                </span>
                <span>
                    {props.name}
                </span>
            </div>
            <div className='leader-reg'>
                {props.regNo}
            </div>
        </div>
        </div>
    );
}

export default function Leaderboard() {
    const [ PageHtml, setPageHtml] = useState( <>
        <NavSpace />
        <Spinner />
    </>);


    const updatePageHtml = () => {
        setPageHtml(<>
            <div>
                <div className="background-pink-blue" style={{minHeight : '100vh'}}>
                <div id='navBarLandingPageContainer'>
                    <NavBarSecond />
                </div>
                <NavSpace />
                <div className='leader-heading'>Leaderboard</div>
                <div>
                    {noticeComponent}
                </div>
            </div>
        </div>
        </>);
    }

    useEffect(() => {
        // API calls are to be made here...


        updatePageHtml();
    });

    const noticeComponent = userBoardInfo.map( (userInfo, index) => <LeaderUser name={userInfo.name} rank={index + 1} regNo={userInfo.regNo} cfID={userInfo.cfID} _id={userInfo._id} /> );

    return (
        <>{PageHtml}</>
      )
}
