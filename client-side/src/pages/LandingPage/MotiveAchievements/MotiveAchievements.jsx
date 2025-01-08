import { StickyScroll } from "../../../components/ui/sticky_scroll_reveal";
import { Timeline } from "../../../components/ui/timeline";
import objectivesImg from "../../../assets/objectives.png";

export default function MotiveAchievements() {
  // ACHIEVEMENTS TESTING DATA
  /* const achievmentsData = [{
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
    }]; */

  const objectives = [
    {
      title: "Building a Strong Coding Community",
      description:
        "We strive to create a close-knit community of like-minded individuals with honest mindset, who share a passion for coding. Through regular meetings, workshops, and social events, we encourage members to interact, collaborate, and forge meaningful connections, fostering an inclusive and supportive coding culture.",
    },
    {
      title: "Collaboration and Knowledge Sharing",
      description:
        "We believe in the power of teamwork and the benefits of sharing knowledge. Our club facilitate opportunities for members to collaborate on coding projects, solve programming challenges, and exchange ideas and expertise. We organize coding sessions, provide programming exercises, and coding bootcamps to encourage collaboration and foster a spirit of learning together.",
    },
    {
      title: "Personal Growth and Skill Development",
      description:
        "We are committed to help our members grow and excel in their coding abilities. By organizing workshops, seminars, and guest speaker sessions, we provide opportunities for members to learn new programming languages, explore cutting-edge technologies, and develop industry-relevant skills. Through mentorship programs and peer-to-peer learning, we create an environment where everyone can enhance their coding prowess.",
    },
    {
      title: "Promotion of Competitive Programming",
      description:
        "Recognizing the value of competitive programming as a means to sharpen problem-solving skills and improve algorithmic thinking, we actively promote this aspect within our club. We organize coding competitions, encourage our member to participate in external coding contests, and provide resources and guidance to help our members to excel in competitive programming.",
    },
    {
      title: "Our Coding Club's Mission",
      description:
        "Through these objectives, Our Coding Club create a vibrant coding community in the college that empowers its members to grow, learn, and succeed together, while also making a meaningful contribution to the broader coding community.",
    },
  ];

  const data = [
    {
      title: "About CodeHub",
      content: `
                    CodeHub is a comprehensive online platform developed by the Computer Coding Club at MNNIT to support its events, workshops, seminars, and more. Serving as the central hub for all club activities, CodeHub offers easy access to resources and updates related to the club's initiatives. Additionally, the platform features a detailed CodeForces ranking system, tailored to foster a competitive coding environment within the college community.
                    `,
    },
    {
      title: "Our Motive",
      content: `The objective of MNNIT’s Coding Club is to establish a thriving coding community
                    and foster a culture of collaboration, continuous learning, and personal
                    growth.Here in this club we aim to guide and create an environment where
                    individuals with a passion for coding come together to support and inspire each
                    other, ultimately helping everyone in the club to enhance their programming skills
                    and reach their full potential.`,
    },
  ];

  return (
    <div className="bg-black w-auto h-auto flex flex-col ">
      <div>
        <Timeline data={data} />
      </div>
      <div className="md:mt-24">
        <h3 className="text-center text-3xl md:text-5xl font-bold text-yellow-600 mb-5 md:mb-10">
          Our Objectives
        </h3>
        <StickyScroll content={objectives} image={objectivesImg} />
      </div>
    </div>
  );
}
