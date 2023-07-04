import React, { useEffect, useState } from 'react';
import './VideoLists.css';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import Alert from '../../components/Alert/Alert';


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
    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);


    const updatePageHtml = async () => {
        try {
            const VideoAPIresponse = await axios.get('http://localhost:8080' + '/education/videos');
            const VideoInfo = VideoAPIresponse.data;

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