import React, { useEffect, useState } from 'react';
import '../pages.css';
import './Leaderboard.css';
import axios from 'axios';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import UserHome from '../UserHome/UserHome';
// import UserHome from '../UserHome/UserHome';

function LeaderUser(props) {
    const navigate = useNavigate()
    function handleUserClick(){
        navigate(`/user-home/${props.name}`)
    }
    
    return (
        <div>
           <div className="leader-box" onClick={()=>handleUserClick()}>
                <div className=''>
                    <span style={{ marginRight: '5px' }}>

                        <b>#{props.rank}</b>
                    </span>
                    <span>
                        {props.name}
                    </span>
                </div>
                {/* <div className='leader-reg'>
                    {props.regNo}
                </div> */}
            </div>
        </div>
    );
}

export default function Leaderboard() {
    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);
    
   async function SortUsersByRating(userBoardInfo){
    //List of all the Codeforces contests
    const contests = await axios.get('https://codeforces.com/api/contest.list')
    const contests_data = contests.data.result;

    var latestContestId;
    for(const contest of contests_data){
        if(contest.phase === "FINISHED"){
            latestContestId = contest.id;
            break;
        }
    }

    //Users who have given latest contest
    const users = await axios.get(`https://codeforces.com/api/contest.ratingChanges?contestId=${latestContestId}`)
    const userRatings = [];


    for (const userInfo of userBoardInfo) {
        var user = users.data.result.find((usr)=>usr.handle === userInfo.cfID)
           if(!user){
                userRatings.push({handle:userInfo.cfID, rating: "N/A"})
           }
           else{
                userRatings.push({handle:user.handle, rating: user.newRating})
           }
    }


   // Sort the users by rating in decreasing order
    userBoardInfo.sort((a, b) => {
        const aRating = userRatings.find((user) => user.handle === a.cfID).rating;
        const bRating = userRatings.find((user) => user.handle === b.cfID).rating;
        if (aRating === "N/A" && bRating === "N/A") {
          return 0;
        } else if (aRating === "N/A") {
          return 1;
        } else if (bRating === "N/A") {
          return -1;
        } else {
          return bRating - aRating;
        }
      });
}


    const updatePageHtml = async () => {

        try {

            const user = await JSON.parse(localStorage.getItem(process.env.CODETOGETHER_APP_LOCALHOST_KEY));
            const LeaderboardAPIresponse = await axios.post('http://localhost:8000' + '/leaderboard', { cfID: user.cfID }, { withCredentials: true });
            const userBoardInfo = LeaderboardAPIresponse.data.data;
            console.log(userBoardInfo)
            await SortUsersByRating(userBoardInfo)
            const LeaderComponent = userBoardInfo.map((userInfo, index) => <LeaderUser key={index} name={userInfo.cfID} rank={index + 1} _id={userInfo._id} />);


            setPageHtml(<>
                <div>
                    <div className="background-pink-blue">
                        <div id='navBarLandingPageContainer'>
                            <NavBarSecond />
                        </div>
                        <NavSpace />
                        <div className='leader-heading'>Leaderboard</div>
                        <div>
                            {LeaderComponent}
                        </div>
                    </div>
                    <Footer />
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
