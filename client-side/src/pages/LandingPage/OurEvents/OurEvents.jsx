import { useRef } from "react";
import "./OurEvents.css";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundGradient } from "../../../components/ui/backgroundGradient";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function OurEvents() {
  const navigate = useNavigate();
  const EventContainer = useRef();

  // EVENTS DEMO DATA
  const eventsData = [
    {
      eventName: "Insomnia",
      summary:
        "An ACM-ICPC styled team based competitive programming contest organised by Motilal Nehru National Institute of Technology Annually in its Technical fest Avishkar",
      registrationStatus: false,
    },
    {
      eventName: "Code Of The Day",
      summary:
        "An ACM-ICPC styled 7-days long solo competitive programming contest organised by Motilal Nehru National Institute of Technology Annually in its Technical fest Avishkar",
      registrationStatus: false,
    },
    {
      eventName: "Hack-36",
      summary:
        "A 36 hours long Hackathon organised Annually by Motilal Nehru National Institute of Technology",
      registrationStatus: false,
    },
    {
      eventName: "Code Sangam",
      summary:
        "A unified blend of development events based on all known tech stacks organised annually by Motilal Nehru National Institute of Technology",
      registrationStatus: false,
    },
    {
      eventName: "OPC",
      summary:
        "Open Programming Challenge is a programming contest organised within the college. Its frequency is not predefined and hence can be organised several times in the same academic year.",
      registrationStatus: false,
    },
    {
      eventName: "Bit-O-Mania",
      summary:
        "An ACM-ICPC styled competitive programming contest organised in collaboration with other institutes. It may not be organised every year.",
      registrationStatus: false,
    },
  ];

  return (
    <div className="my-20 ">
      <div className="text-center text-3xl  md:text-5xl font-bold text-yellow-600 mb-20">
        Our Events
      </div>
      <div
        className="flex flex-wrap justify-center gap-x-10 gap-y-10 "
        ref={EventContainer}
      >
        {eventsData.map((event) => {
          return (
            <div className="w-[20rem] ">
              <BackgroundGradient>
                <div className="bg-gray-900 flex flex-col gap-y-5 rounded-3xl p-5 h-[20rem] overflow-auto">
                  <h3 className="text-white text-2xl font-medium">
                    {event.eventName}
                  </h3>
                  <p className="text-slate-400 text-lg h-[10rem] overflow-auto">
                    {event.summary}
                  </p>
                  {event.registrationStatus ? (
                    <>
                      <div
                        onClick={() => navigate("/demoLink")}
                        className="eventBoxRegistrationOpen"
                      >
                        Register Now
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="eventBoxRegistrationClosed">
                        Registration Closed
                      </div>
                    </>
                  )}
                </div>
              </BackgroundGradient>
            </div>
          );
        })}
      </div>
    </div>
  );
}
