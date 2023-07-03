import React, { useEffect, useState } from 'react';
import '../pages.css';
import './NoticeBoard.css';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import NavSpace from '../../components/NavSpace';
import Spinner from '../../components/Spinner/Spinner';


// Ishaan Aggrawal
// Akhil Gupta


// noticeList is a dummy data
const noticeList = [
    {
        title : `CodeTogether's Quarters 31`,
        body : `We are pleased to annouce that codeTogether is conduction it's 31st Quarters on 21st November 2022 at 8:00 PM IST.\nIt will be conducted on CodeForces on CodeTogether's official group. Join the group in advance so that you won't miss it out. The registraions will begin exactly 6 hours before the contest's start time.\n\nQuarters are ICPC styled 3 hours long competitive programming contests organised by CodeTogether 4 times a year.\n-It is a solo event.\n-It will be comducted in Online mode.\n\nRegards,\nTeam CodeTogether`,
        date : `15 October, 2022`,
        _id : `demoID23432`
    },
    {
        title : `CodeTogether's Quarters 30 Winners`,
        body : `We are grateful for your immense love towards this contest. This contest consisted of 400+ participants with 1700+ submissions. \nThe top three positions are secured by, \n  1 - Albert Einstein ( Reg. no. : 234DF23 ) ( CF ID : alberto12 ) \n  2 - Isaac newton ( Reg no. : 342JF23 ) ( CF ID : ISISIS )\n  3 - Leonardo da vinci ( Reg no. : 234JF22 ) ( CF ID : blueBird )\n\nThe fastest problem solver for the respective problems were,\n  A - Albert Einstein ( Reg. no. : 234DF23 ) ( CF ID : alberto12 )\n  B - Isaac newton ( Reg no. : 342JF23 ) ( CF ID : ISISIS )\n  C - Albert Einstein ( Reg. no. : 234DF23 ) ( CF ID : alberto12 )\n  D - Remained Unsolved\n  E - Albert Einstein ( Reg. no. : 234DF23 ) ( CF ID : alberto12 )\n\nThe Editorials for the contest has been uploaded on the Group's blogs in codeforces.com. Do try to go through them and upsolve those problems to be able to perform better in future rounds.\nRegards,\nTeam CodeTogether` ,
        date : `15 April, 2022`,
        _id : `asdfewwef`
    },
    {
      title : `CodeTogether's Quarters 31`,
      body : `We are pleased to annouce that codeTogether is conduction it's 31st Quarters on 21st November 2022 at 8:00 PM IST.\nIt will be conducted on CodeForces on CodeTogether's official group. Join the group in advance so that you won't miss it out. The registraions will begin exactly 6 hours before the contest's start time.\n\nQuarters are ICPC styled 3 hours long competitive programming contests organised by CodeTogether 4 times a year.\n-It is a solo event.\n-It will be comducted in Online mode.\n\nRegards,\nTeam CodeTogether`,
      date : `15 October, 2022`,
      _id : `demoID2332`
  },
];


function Notice(props)
{
    return (
        <div>
        <div className="notice-box">
            <div className="notice-title">{props.title}</div>
            <div className="notice-date">{props.date}</div>
            <div className="notice-body"><pre style={{fontFamily : 'sans-serif', justifyContent : 'space-evenly'}}>{props.body}</pre></div>
        </div>
        </div>
    );
}

function CreateNotice(props) {
  return (
    <Notice
      key={props._id}
      title={props.title}
      date={props.date}
      body={props.body}
    />
  );
}


export default function NoticeBoard() {
  const [ PageHtml, setPageHtml] = useState( <>
    <NavSpace />
    <Spinner />
  </>);

  const updatePageHtml = () => {
    setPageHtml(
      <div>
          <NavBarSecond />
          <div className="background-pink-blue" style={{minHeight : '100vh'}}>
          <NavSpace />
          <div className='notice-heading'>Notice Board</div>
          {noticeList.map(CreateNotice)}
          <div className='notice-footer'>
            This was the last Notice from CodeTogether. Either no Notice prior to this was ever created or they have been deleted by the admins.
          </div>
        </div>
    </div>
  );
  }

  useEffect( () => {

    updatePageHtml();
  }, );


  return (
    <>{PageHtml}</>
  )
}