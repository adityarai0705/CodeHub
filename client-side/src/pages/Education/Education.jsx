/**
 * @fileoverview Education page where user can see the categories of videos available for learning.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner/Spinner';
import NavSpace from '../../components/NavSpace';
import Alert from '../../components/Alert/Alert';
import Footer from '../../components/Footer/Footer';
import '../pages.css';
import './Education.css';

// Function to display the category of videos available for learning.
function EduSection(props) {
    useEffect(()=>{
        toast.dismiss();
    },[])
    const _id = props._id;
    return (
        <div>
            <div className="super-box" onClick={() => props.redirectToVideos(props.title)}>
                <div className="edu-box">
                    <div className="edu-title">{props.title}</div>
                </div>
            </div>
        </div>
    );
}

export default function Education() {

    const navigate = useNavigate(); // For navigation to other routes.
    const { user } = useSelector((state) => state.auth); // To get the user details from the redux store.

    // PageHtml is the state variable.
    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);

    // Function to redirect to the videos page of the selected category..
    const redirectToVideos = (category) => {
        navigate(`/education/videos?category=${category}`);
    }

    // Function to fetch the categories available for learning and update the page html.
    const updatePageHtml = async () => {
        try {
            // Fetching the categories available for learning.
            const EducationAPIresponse = await axios.post(process.env.REACT_APP_SERVER_BASE_URL + '/education', { cfID: user.cfID }, { withCredentials: true });
            const EducationInfo = EducationAPIresponse.data.data;
            const EducationComponent = EducationInfo.map((category, index) => <EduSection key={index} title={category.title} _id={category._id} redirectToVideos={redirectToVideos} />)

            // Setting the page html.
            setPageHtml(<>
                <div className="background-pink-blue">
                    <NavSpace />
                    <div className='education-heading'>Education</div>
                    <div className='EducationOuterContainer'>
                        <div className='EducationInnerContainer'>
                            {EducationComponent}
                        </div>
                    </div>
                </div>
                <Footer />
            </>);
        } catch (err) {

            // Setting the page html in case of error.
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

    // Returning the JSX of the Education
    return (
        <>
            {PageHtml}
        </>
    );
}