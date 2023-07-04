import React from 'react';
import "./OurEvents.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';

export default function OurEvents() {

    const navigate = useNavigate();

    // EVENTS DEMO DATA
    const eventsData = [{
        eventName: "Chicago State Event",
        summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit reprehenderit pariatur quidem inventore harum adipisci debitis rem, omnis similique voluptatum praesentium voluptatem ad, beatae, possimus nisi porro nesciunt cum! Facere!",
        registrationStatus: true
    }, {
        eventName: "Art of Coding",
        summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit reprehenderit pariatur quidem inventore harum adipisci debitis rem, omnis similique voluptatum praesentium voluptatem ad, beatae, possimus nisi porro nesciunt cum! Facere!",
        registrationStatus: true
    }, {
        eventName: "Australia Olympiad Event",
        summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit reprehenderit pariatur quidem inventore harum adipisci debitis rem, omnis similique voluptatum praesentium voluptatem ad, beatae, possimus nisi porro nesciunt cum! Facere!",
        registrationStatus: false
    }, {
        eventName: "IIT Bombay Fest",
        summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit reprehenderit pariatur quidem inventore harum adipisci debitis rem, omnis similique voluptatum praesentium voluptatem ad, beatae, possimus nisi porro nesciunt cum! Facere!",
        registrationStatus: false
    }];


    return (
        <div id='ourEventsMain'>
            <div id='ourEventsTitle'>
                Our Events
            </div>
            <div id='ourEventsContent'>
                {eventsData.map((event) => {
                    return (
                        <div key={uuidv4()} className="eventBoxMain">
                            <div className='eventBoxContentMain'>
                                <div className='eventBoxEventName'>{event.eventName}</div>
                                <div className='eventBoxEventSummary'>{event.summary}</div>
                                {
                                    (event.registrationStatus)
                                        ?
                                        <>
                                            <div onClick={() => navigate("/demoLink")} className='eventBoxRegistrationOpen'>
                                                Register Now
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className='eventBoxRegistrationClosed'>
                                                Registration Closed
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}