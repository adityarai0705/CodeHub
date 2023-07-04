import React, { useEffect, useState } from 'react';
import '../pages.css';
import './Leaderboard.css';
import axios from 'axios';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import NavBarSecond from '../../components/NavBar/NavBarSecond';


function LeaderUser(props) {
    return (
        <div>
            <div className="leader-box">
                <div className=''>
                    <span style={{ marginRight: '5px' }}>
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
    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);


    const updatePageHtml = async () => {

        try {
            const LeaderboardAPIresponse = await axios.get('http://localhost:8080' + '/leaderboard');
            const userBoardInfo = LeaderboardAPIresponse.data;

            const noticeComponent = userBoardInfo.map((userInfo, index) => <LeaderUser key={index} name={userInfo.name} rank={index + 1} regNo={userInfo.regNo} cfID={userInfo.cfID} _id={userInfo._id} />);

            setPageHtml(<>
                <div>
                    <div className="background-pink-blue">
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
        } catch (err) {
            setPageHtml(
                <>
                    <div id='navBarLandingPageContainer'>
                        <NavBarSecond />
                    </div>
                    <NavSpace />
                    <div className="background-pink-blue" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Alert heading={"Couldn't fetch data"} body={"Check your internet connection and try again.."} />
                    </div>
                </>
            );
        }
    }

    useEffect(() => {
        updatePageHtml();
    }, []);


    return (
        <>{PageHtml}</>
    );
}
