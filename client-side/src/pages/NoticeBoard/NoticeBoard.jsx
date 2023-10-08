import React, { useEffect, useState } from 'react';
import '../pages.css';
import './NoticeBoard.css';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';



//notice format
function Notice(props) {
  return (
    <div>
      <div className="notice-box">
        <div className="notice-title">{props.title}</div>
        <div className="notice-date">{props.date}</div>
        <div className="notice-body"><pre style={{ fontFamily: 'sans-serif', justifyContent: 'space-evenly' }}>{props.body}</pre></div>
      </div>
    </div>
  );
}

// function CreateNotice(props) {
//   return (
//     <Notice
//       key={props._id}
//       title={props.title}
//       date={props.date}
//       body={props.body}
//     />
//   );
// }


export default function NoticeBoard() {
  const [PageHtml, setPageHtml] = useState(<>
    <NavSpace />
    <Spinner />
  </>);

  const updatePageHtml = async () => {

    try {
      const NoticeboardAPIresponse = await axios.get('http://localhost:8000' + '/noticeboard');
      // const noticeList = [{
      //   "_id": {
      //     "$oid": "652242a76466447c54b608c3"
      //   },
      //   "title": "CodeTogether's Quarters 31",
      //   "body": "We are pleased to annouce that codeTogether is conduction it's 31st Quarters on 21st November 2022 at 8:00 PM IST.\nIt will be conducted on CodeForces on CodeTogether's official group. Join the group in advance so that you won't miss it out. The registraions will begin exactly 6 hours before the contest's start time.\n\nQuarters are ICPC styled 3 hours long competitive programming contests organised by CodeTogether 4 times a year.\n-It is a solo event.\n-It will be comducted in Online mode.\n\nRegards,\nTeam CodeTogether",
      //   "date": "15 October, 2022",
      //   "__v": 0
      // }];
      const noticeList = NoticeboardAPIresponse.data.data;
      console.log(noticeList);


      setPageHtml(<>
        <div>
          <div className="background-pink-blue" style={{ minHeight: '100vh' }}>
            <div id='navBarLandingPageContainer'>
              <NavBarSecond />
            </div>
            <NavSpace />
            <div className='notice-heading'>Notice Board</div>
            {noticeList.map((notice) => {
              <Notice
                key={notice._id}
                title={notice.title}
                date={notice.date}
                body={notice.body}
              />
            })}
            <div className='notice-footer'>
              This was the last Notice from CodeTogether. Either no Notice prior to this was ever created or they have been deleted by the admins.
            </div>
          </div>
          <Footer />
        </div>
      </>);
    }
    catch (err) {
      console.log( err);
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
    <>{PageHtml}</>
  );
}