import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingCard from '../../components/RatingCard';
import ContestRating from './Graphs/ContestRating';
import './UserHome.css';
import PerformanceIndex from './Graphs/PerformanceIndex';
import SubmissionVerdict from './Graphs/SubmissionVerdict';
import ProblemRating from './Graphs/ProblemRating';
import ProfileImg from './UserInfo/ProfileImg';
import '../../pages/pages.css';
import UserDetail from './UserInfo/UserDetail';
import ContestDetails from './ContestDetails/ContestDetails';
import ProblemDetails from './ProblemDetails/ProblemDetails';
import Languages from './Graphs/Languages';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import Alert from '../../components/Alert/Alert';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom';


export default function UserHome() {

    // Declared Data members

    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);

    const params = useParams()

    const cfID = params.id;
    console.log(cfID)

    let userData = { status: "", data: {} };
    let userRating = { status: "", data: {} };
    let userSubmissions = { status: "", data: {} };
    let userLanguage = { status: "", data: {} };
    let userSubmissionVerdict = {
        FAILED: 0, OK: 0, PARTIAL: 0, COMPILATION_ERROR: 0, RUNTIME_ERROR: 0, WRONG_ANSWER: 0, PRESENTATION_ERROR: 0, TIME_LIMIT_EXCEEDED: 0, MEMORY_LIMIT_EXCEEDED: 0, IDLENESS_LIMIT_EXCEEDED: 0, SECURITY_VIOLATED: 0, CRASHED: 0, INPUT_PREPARATION_CRASHED: 0, CHALLENGED: 0, SKIPPED: 0, TESTING: 0, REJECTED: 0
    }
    let userSubmissionRating = []
    let userDetail = {
        name: "",
        handle: "",
        rating: "",
        contributions: "",
        contestGiven: "",
        problemSolved: 0,
        submissionsMade: 0,
        bestRank: 10000000,
        HighestRatingGain: 0
    }


    async function fetchData() {

        // API calls and Initialisation of Data Members

        try {
            console.log(cfID)
            const userDataAPI = await axios.get("https://codeforces.com/api/user.info?handles=" + cfID);
            const userRatingAPI = await axios.get("https://codeforces.com/api/user.rating?handle=" + cfID);
            const userSubmissionsAPI = await axios.get("https://codeforces.com/api/user.status?handle=" + cfID);

            userData.status = userDataAPI.data.status;
            userData.data = userDataAPI.data.result[0];

            userRating.status = userRatingAPI.data.status;
            userRating.data = userRatingAPI.data.result;

            userSubmissions.status = userSubmissionsAPI.data.status;
            userSubmissions.data = userSubmissionsAPI.data.result;

            userLanguage.status = userSubmissionsAPI.data.status


            if (userData.data.firstName === undefined && userData.data.lastName === undefined) {
                userDetail.name = "Name not available"
            } else if (userData.data.firstName === undefined) {
                userDetail.name = userData.data.lastName
            } else if (userData.data.lastName === undefined) {
                userDetail.name = userData.data.firstName
            } else {
                userDetail.name = userData.data.firstName + ' ' + userData.data.lastName
            }
            userDetail.handle = userData.data.handle;
            userDetail.rating = userData.data.rating;
            userDetail.contributions = userData.data.contribution;
            userDetail.contestGiven = userRating.data.length;
            userDetail.submissionsMade = userSubmissions.data.length;

            for (let i = 800; i <= 3500; i += 100) {
                userSubmissionRating[(i / 100) - 8] = {
                    'name': i,
                    'uv': 0,
                    'fill': ''
                }
            }

            userSubmissionRating[0].fill = 'rgb( 150, 150, 150)'; // 800
            userSubmissionRating[1].fill = 'rgb( 150, 150, 150)'; // 900
            userSubmissionRating[2].fill = 'rgb( 150, 150, 150)'; // 1000
            userSubmissionRating[3].fill = 'rgb( 150, 150, 150)'; // 1100
            userSubmissionRating[4].fill = 'rgb( 156, 252, 136)'; // 1200
            userSubmissionRating[5].fill = 'rgb( 156, 252, 136)'; // 1300
            userSubmissionRating[6].fill = 'rgb( 144, 216, 187)'; // 1400
            userSubmissionRating[7].fill = 'rgb( 144, 216, 187)'; // 1500
            userSubmissionRating[8].fill = 'rgb( 154, 154, 225)'; // 1600
            userSubmissionRating[9].fill = 'rgb( 154, 154, 225)'; // 1700
            userSubmissionRating[10].fill = 'rgb( 154, 154, 225)'; // 1800
            userSubmissionRating[11].fill = 'rgb( 240, 142, 249)'; // 1900
            userSubmissionRating[12].fill = 'rgb( 240, 142, 249)'; // 2000
            userSubmissionRating[13].fill = 'rgb( 248, 206, 146)'; // 2100
            userSubmissionRating[14].fill = 'rgb( 248, 206, 146)'; // 2200
            userSubmissionRating[15].fill = 'rgb( 245, 190, 103)'; // 2300
            userSubmissionRating[16].fill = 'rgb( 238, 127, 123)'; // 2400
            userSubmissionRating[17].fill = 'rgb( 238, 127, 123)'; // 2500
            userSubmissionRating[18].fill = 'rgb( 235, 72, 63)'; // 2600
            userSubmissionRating[19].fill = 'rgb( 235, 72, 63)'; // 2700
            userSubmissionRating[20].fill = 'rgb( 235, 72, 63)'; // 2800
            userSubmissionRating[21].fill = 'rgb( 235, 72, 63)'; // 2900
            userSubmissionRating[22].fill = 'rgb( 156, 31, 20)'; // 3000
            userSubmissionRating[23].fill = 'rgb( 156, 31, 20)'; // 3100
            userSubmissionRating[24].fill = 'rgb( 156, 31, 20)'; // 3200
            userSubmissionRating[25].fill = 'rgb( 156, 31, 20)'; // 3300
            userSubmissionRating[26].fill = 'rgb( 156, 31, 20)'; // 3400
            userSubmissionRating[27].fill = 'rgb( 156, 31, 20)'; // 3500

            userRating.data.map(contest => {
                let curRank = contest.rank;
                let curRatingGain = contest.newRating - contest.oldRating;

                userDetail.bestRank = Math.min(curRank, userDetail.bestRank);
                userDetail.HighestRatingGain = Math.max(curRatingGain, userDetail.HighestRatingGain);

                return null;
            });

            userSubmissions.data.map((submission) => {
                for (let i of submission.programmingLanguage.split(" ")) {
                    if (i.toUpperCase() === "GNU" || i.toUpperCase() === "G++" || i.toUpperCase() === "MS") {
                        userLanguage.data['C/C++'] = userLanguage.data['C/C++'] ? userLanguage.data['C/C++'] + 1 : 1;
                    }
                    if (i.toUpperCase() === "PYPY" || i.toUpperCase() === "PYTHON") {
                        userLanguage.data['Python'] = userLanguage.data['Python'] ? userLanguage.data['Python'] + 1 : 1;
                    }
                    if (i.toUpperCase() === "JAVA") {
                        userLanguage.data['Java'] = userLanguage.data['Java'] ? userLanguage.data['Java'] + 1 : 1;
                    }
                    if (i.toUpperCase() === "JAVASCRIPT") {
                        userLanguage.data['Javascript'] = userLanguage.data['Javascript'] ? userLanguage.data['Javascript'] + 1 : 1;
                    }
                    if (i.toUpperCase() === "KOTLIN") {
                        userLanguage.data['Kotlin'] = userLanguage.data['Kotlin'] ? userLanguage.data['Kotlin'] + 1 : 1;
                    }
                }
                userSubmissionVerdict[submission.verdict] += 1;
                if (submission.verdict === 'OK' && submission.problem.rating !== undefined) {
                    userSubmissionRating[(submission.problem.rating / 100) - 8].uv += 1;
                    userDetail.problemSolved += 1;
                }

                return null;
            });

            setPageHtml(
                <>
                <div className='background-pink-blue'>
                    <div className='navBarContainer'>
                        <NavBarSecond />
                    </div>
                    <NavSpace />
                    <div className='UserHomeOuterContainer'>
                        <div className='UserHomeInnerContainer'>

                            <div className='TopUserHome'>
                                <RatingCard name={userDetail.name} rank={userData.data.rank} />
                                <ProfileImg image={userData.data.titlePhoto} />
                            </div>
                            <UserDetail userdetail={userDetail} />
                            <div className='BottomUserHome background-white-trans'>
                                <ContestRating ratingdata={userRating.data} />
                                <PerformanceIndex ratingdata={userRating.data} />
                                <SubmissionVerdict verdictdata={userSubmissionVerdict} />
                                <ProblemRating questionratingdata={userSubmissionRating} />
                                <Languages languagedata={userLanguage} />
                                <div style={{ height: '80px' }}></div>
                            </div>
                            <div>
                                <ContestDetails contestData={userRating.data} />
                                <ProblemDetails problemData={userSubmissions.data} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                </>
            );
        } catch (error) {
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
        fetchData();
    }, [cfID]);


    return (
        <>{PageHtml}</>
    );
}
