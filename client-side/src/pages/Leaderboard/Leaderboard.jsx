import React, { useEffect, useState } from 'react';
import '../pages.css';
import './Leaderboard.css';
import axios from 'axios';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import Footer from '../../components/Footer/Footer';

function LeaderUser(props) {
    return (
        <div>
            <div className="leader-box">
                <div className=''>
                    <span style={{ marginRight: '5px' }}>
                        
                        <b>#{props.rank}</b>
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

async function SortUsersByRating(userBoardInfo) {
    const userRatings = [];

    for (const userInfo of userBoardInfo) {
      try {
        const ratingResponse = await axios.get(
          `https://codeforces.com/api/user.info?handles=${userInfo.cfID}`
        );

        if (ratingResponse.data.status === "OK") {
          const user = ratingResponse.data.result[0];
          userRatings.push({ handle: userInfo.cfID, rating: user.rating });
        } else {
          userRatings.push({ handle: userInfo.cfID, rating: "N/A" });
        }

        // Introduce a delay (Codeforces  rate limit (1 request per 2 seconds) )
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        userRatings.push({ handle: userInfo.cfID, rating: "N/A" });
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
            const LeaderboardAPIresponse = await axios.get('http://localhost:8080' + '/leaderboard');
            const userBoardInfo = LeaderboardAPIresponse.data;
            await SortUsersByRating(userBoardInfo);
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
