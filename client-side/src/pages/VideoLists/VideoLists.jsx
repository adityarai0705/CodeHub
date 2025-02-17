/**
 * @fileoverview VideoLists page displays the list of videos based on the category selected by the user.
 */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import Footer from '../../components/Footer/Footer';
import './VideoLists.css';

//format of the video tile displayed in the video list.
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

    //fetch the videos based on the category selected by the user.
    const updatePageHtml = async () => {
        try {
            //fetch the category selected by the user.
            const searchParams = new URLSearchParams(location.search);
            const educationCategory = searchParams.get('category');

            //fetch videos.
            const user = await JSON.parse(localStorage.getItem(process.env.CODETOGETHER_APP_LOCALHOST_KEY));
            const VideoAPIresponse = await axios.post(process.env.REACT_APP_SERVER_PATH + '/education/videos', { categoryID: educationCategory, cfID: user.cfID }, { withCredentials: true });
            const VideoInfo = VideoAPIresponse.data.data;

            //format the fetched videos according to the VideoTile component.
            const VideoLists = VideoInfo.map((video, index) =>
                <VideoTile key={index} title={video.title} date={video.date} ytLink={video.ytLink} _id={video._id} />
            );

            //set the page html with the fetched videos.
            setPageHtml(<>
                <div>
                    <div className="background-pink-blue" style={{ minHeight: '100vh' }}>
                        <NavSpace />
                        <div className='videoList-heading'><small>Education</small>/{educationCategory}</div>
                        <div className='videoContainer'>
                            {VideoLists}
                        </div>
                    </div>
                    <Footer />
                </div>
            </>);
        } catch (err) {
            //if there is an error in fetching the videos, display an alert.
            setPageHtml(
                <>
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

    //return the page html.
    return (
        <>
            {PageHtml}
        </>
    )
}