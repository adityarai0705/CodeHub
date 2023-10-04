import React from 'react'
import "./MotiveAchievements.css"
import { v4 as uuidv4 } from "uuid";

export default function MotiveAchievements() {

    // ACHIEVEMENTS DEMO DATA
    const achievmentsData = [{
        eventName: "Chicago State Event",
        date: "July, 2022",
        rank: "Rank 1"
    }, {
        eventName: "Art of Coding",
        date: "August, 2022",
        rank: "Rank 2"
    }, {
        eventName: "Australia Olympiad Event",
        date: "September, 2022",
        rank: "Rank 3"
    }, {
        eventName: "IIT Bombay Fest",
        date: "October, 2022",
        rank: "Rank 4"
    }, {
        eventName: "New York State Event",
        date: "November, 2022",
        rank: "Rank 5"
    }, {
        eventName: "Research for Life",
        date: "November, 2022",
        rank: "Rank 6"
    }, {
        eventName: "Trio Maniac",
        date: "November, 2022",
        rank: "Rank 7"
    }];


    return (
        <div id='motiveAchievementsMain'>
            <div id='motiveMain'>
                <div id='motiveTitleMain'>
                    Our Motive
                </div>
                <div id='motiveContentMain'>
                    <p>The objective of the "Code Together" coding club is to establish a thriving coding community and foster a culture of collaboration, continuous learning, and personal growth. We aim to create an environment where individuals with a passion for coding come together to support and inspire each other, ultimately helping everyone in the club to enhance their programming skills and reach their full potential.</p>
                    <p>Specifically, our objectives are:</p>
                    <p>1. Building a Strong Coding Community: We strive to create a close-knit community of like-minded individuals who share a passion for coding. Through regular meetings, workshops, and social events, we will encourage members to interact, collaborate, and forge meaningful connections, fostering an inclusive and supportive coding culture.</p>
                    <p>2. Collaboration and Knowledge Sharing: We believe in the power of teamwork and the benefits of sharing knowledge. Our club will facilitate opportunities for members to collaborate on coding projects, solve programming challenges, and exchange ideas and expertise. We will organize coding sessions, pair programming exercises, and coding bootcamps to encourage collaboration and foster a spirit of learning together.</p>
                    <p>3. Personal Growth and Skill Development: We are committed to helping our members grow and excel in their coding abilities. By organizing workshops, seminars, and guest speaker sessions, we will provide opportunities for members to learn new programming languages, explore cutting-edge technologies, and develop industry-relevant skills. Through mentorship programs and peer-to-peer learning, we will create an environment where everyone can enhance their coding prowess.</p>
                    <p>4. Promotion of Competitive Programming: Recognizing the value of competitive programming as a means to sharpen problem-solving skills and improve algorithmic thinking, we will actively promote this aspect within our club. We will organize coding competitions, participate in external coding contests, and provide resources and guidance to help members excel in competitive programming.</p>
                    <p>5. Outreach and Community Engagement: We believe in the importance of giving back and sharing our knowledge with the wider community. Our club will organize coding workshops, tutorials, and outreach programs in schools, colleges, and local communities to inspire and educate aspiring coders. By fostering a spirit of mentorship, we aim to create a positive impact on the coding ecosystem beyond our club.</p>
                    <p>Through these objectives, "Code Together" will create a vibrant coding community that empowers its members to grow, learn, and succeed together, while also making a meaningful contribution to the broader coding community.</p>
                </div>
            </div>
            <div style={{ height : '50vh'}}></div>
            <div id='achievementsMain'>
                <div id='achievementsTitleMain'>
                    Our Achievements
                </div>
                <div id='achievementsContentMain'>
                    <div className='achievementsBoxExtraMarginMain'>
                    </div>
                    {achievmentsData.map((achievment) => {
                        return (
                            <div key={uuidv4()} className="achievementBoxCoverMain">
                                <div className='achievementBoxContentMain'>
                                    <div className='achievementBoxEventName'>{achievment.eventName}</div>
                                    <div className='achievementBoxEventDate'>{achievment.date}</div>
                                    <div className='achievementBoxEventRank'>{achievment.rank}</div>
                                </div>
                            </div>
                        );
                    })}
                    <div className='achievementsBoxExtraMarginMain'>
                    </div>
                </div>
            </div>
        </div>
    )
}