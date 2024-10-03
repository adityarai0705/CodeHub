import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Welcome from './Welcome/Welcome'
import "./LandingPage.css"
import TeamMember from '../Team/TeamMember'
import MotiveAchievements from './MotiveAchievements/MotiveAchievements'
import OurEvents from './OurEvents/OurEvents'
import QuickLinkAboutUs from './QuickLinksAboutUs/QuickLinkAboutUs'
import ContactUs from './ContactUs/ContactUs'

export default function LandingPage() {
    return (
        <>
            {/*  -----------------NAVBAR SECTION-------------------  */}
            <div id='navBarLandingPageContainer'>
                <NavBar />
            </div>
            {/* ---------------------END---------------------- */}
            {/*  -----------------WELCOME SECTION-------------------  */}
            <div id='welcomeLandingPageContainer'>
                <Welcome />
            </div>
            {/* ---------------------END---------------------- */}
            {/*  -----------------QUICKLINKABOUTUS SECTION-------------------  */}
            <div id='quickLinkAboutUsLandingPageContainer'>
                <QuickLinkAboutUs />
            </div>
            {/* ---------------------END---------------------- */}
            {/*  -----------------TEAMS SECTION-------------------  */}
            <div id='teamsContainer'>
                <TeamMember />
            </div>
            {/* ---------------------END---------------------- */}
            {/*  -----------------MOTIVEACHIEVEMENTS SECTION-------------------  */}
            <div id='motiveAchievementsContainer'>
                <MotiveAchievements />
            </div>
            {/* ---------------------END---------------------- */}
            {/*  -----------------OUREVENTS SECTION-------------------  */}
            <div id='ourEventsContainer'>
                <OurEvents />
            </div>
            {/* ---------------------END---------------------- */}
            {/*  -----------------CONTACTUS SECTION-------------------  */}
            <div id='contactUsContainer'>
                <ContactUs />
            </div>
            {/* ---------------------END---------------------- */}
        </>
    )
}
