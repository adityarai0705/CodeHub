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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, iste esse delectus sequi facere ad repellat labore. Porro accusamus iste nostrum dolore incidunt labore sunt natus, ipsa ipsam molestiae id.
                    Itaque eos eius quia? Animi ut suscipit nisi, eius veniam natus officia quidem perspiciatis velit inventore odit sunt tempora illum aspernatur odio quae fugit voluptatem! Officiis totam voluptate quidem veritatis!
                    Cum officia, repudiandae fugit perferendis voluptatem quasi? Earum possimus, facilis quod laboriosam suscipit error animi reprehenderit recusandae nobis! Itaque at repellendus enim obcaecati odio deleniti sint suscipit. Id, possimus molestias?
                    possimus ullam nulla totam similique cupiditate hic nemo tempora eius nihil mollitia distinctio neque, quas perferendis harum? Quia, animi nobis amet ab similique earum vel quae qui.
                    Rerum corrupti sint nesciunt a ab, quas veritatis, nisi explicabo neque quia quod, aliquid consectetur est eaque necessitatibus eum doloribus. Quia eius amet facere ex assumenda voluptatem accusantium neque possimus.
                    Provident tempora iure sed velit laudantium hic eum aspernatur reprehenderit cum temporibus placeat, quasi quis pariatur, debitis accusantium molestias itaque rerum. Explicabo in, temporibus iste quasi velit ducimus ab. Nemo.
                    Impedit earum odit libero quibusdam deserunt. Ipsum facilis quas necessitatibus nisi ratione asperiores eveniet aliquam omnis corrupti repellendus id autem atque debitis pariatur laboriosam aut hic, unde ipsa vero ad.
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