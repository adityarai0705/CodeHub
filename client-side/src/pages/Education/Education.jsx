import React, { useState, useEffect } from 'react';
import '../pages.css';
import './Education.css';
import Spinner from '../../components/Spinner/Spinner';
import NavSpace from '../../components/NavSpace';
import Alert from '../../components/Alert/Alert';
import axios from 'axios';
import NavBarSecond from '../../components/NavBar/NavBarSecond';

function EduSection(props) {
    const _id = props._id;
    return (
        <div>
            <div className="super-box">
                <div className="edu-box">
                    <div className="edu-title">{props.title}</div>
                </div>
            </div>
        </div>
    );
}

export default function Education() {

    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);

    const updatePageHtml = async () => {

        try {
            const EducationAPIresponse = await axios.get('http://localhost:8080' + '/education');
            const EducationInfo = EducationAPIresponse.data;

            const EducationComponent = EducationInfo.map( ( category, index) => <EduSection key={index} title={category.title} _id={category._id} />)

            setPageHtml(<>
                <div className="background-pink-blue">
                    <div id='navBarLandingPageContainer'>
                        <NavBarSecond />
                    </div>
                    <NavSpace />
                    <div className='education-heading'>Education</div>
                    <div className='EducationOuterContainer'>
                        <div className='EducationInnerContainer'>
                            {EducationComponent}
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
    );
}