import Welcome from "./Welcome/Welcome";
import "./LandingPage.css";
import MotiveAchievements from "./MotiveAchievements/MotiveAchievements";
import OurEvents from "./OurEvents/OurEvents";
import Footer from "../../components/Footer/Footer";

export default function LandingPage() {
  return (
    <div className="bg-black h-auto">
      {/* ---------------------END---------------------- */}
      {/*  -----------------WELCOME SECTION-------------------  */}
      <div id="welcomeLandingPageContainer">
        <Welcome />
      </div>
      {/* ---------------------END---------------------- */}
      {/*  -----------------QUICKLINKABOUTUS SECTION-------------------  */}
      {/* <div id='quickLinkAboutUsLandingPageContainer'>
                <QuickLinkAboutUs />
            </div> */}
      {/* ---------------------END---------------------- */}
      {/*  -----------------TEAMS SECTION-------------------  */}
      {/* <div id='teamsContainer'>
                <TeamMember />
            </div> */}
      {/* ---------------------END---------------------- */}
      {/*  -----------------MOTIVEACHIEVEMENTS SECTION-------------------  */}
      <div id="motiveAchievementsContainer">
        <MotiveAchievements />
      </div>
      {/* ---------------------END---------------------- */}
      {/*  -----------------OUREVENTS SECTION-------------------  */}
      <div id="ourEventsContainer">
        <OurEvents />
      </div>
      {/* ---------------------END---------------------- */}
      <Footer />
      {/* ---------------------END---------------------- */}
    </div>
  );
}
