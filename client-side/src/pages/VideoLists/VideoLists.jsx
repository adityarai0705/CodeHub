import React, { useEffect, useState } from 'react';
import './VideoLists.css';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import Alert from '../../components/Alert/Alert';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';


function VideoTile(props) {
    return (
        <div className='videoTile'>
            <div className='videDesc'>
                <h3><b>{props.title}</b></h3>
                <p>{props.date}</p>
            </div>
            <div className='vidCont' style={{}}>
                <iframe style={{ borderRadius: '7px' }} src={props.ytLink} title={props.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default function VideoLists(props) {
    const location = useLocation();

    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);
    

    const updatePageHtml = async () => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const educationCategory = searchParams.get('category');
            const user = await JSON.parse(localStorage.getItem(process.env.CODETOGETHER_APP_LOCALHOST_KEY));
            const VideoAPIresponse = await axios.post('http://localhost:8000' + '/education/videos', { educationCategory : educationCategory , cfID: user.cfID }, { withCredentials: true });
            const VideoInfo = VideoAPIresponse.data.data;

            const VideoLists = VideoInfo.map((video, index) =>
                <VideoTile key={index} title={video.title} date={video.date} ytLink={video.ytLink} _id={video._id} />
            );
            setPageHtml(<>
                <div>
                    <div className="background-pink-blue" style={{ minHeight: '100vh' }}>
                        <div className='navBarContainer'>
                            <NavBarSecond />
                        </div>
                        <NavSpace />
                        <div className='videoList-heading'><small>Education</small>/{props.heading}</div>
                        <div className='videoContainer'>
                            {VideoLists}
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
        <>
            {PageHtml}
        </>
    )
}