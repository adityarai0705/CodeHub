import React, { useEffect, useState } from 'react';
import CTAdmin from '../../components/CTAdmin';
import axios from 'axios';
import './Notice.css';
import Button from '../../components/Button/Button';

function NoticeComponent(props) {
    return (
      <div className='NoticeListContainer'>
        <div className="notice-box">
          <div className="notice-title">{props.title}</div>
          <div className="notice-date">{props.date}</div>
          <div className="notice-body"><pre style={{ fontFamily: 'sans-serif', justifyContent: 'space-evenly' }}>{props.body}</pre></div>
          <Button text={"delete"} col={'red'}/>
        </div>
      </div>
    );
  }

  function RenderNotice(props) {
    return (
      <NoticeComponent
        key={props._id}
        title={props.title}
        date={props.date}
        body={props.body}
      />
    );
  }

export default function AdminNotice() {
    const [PageHtml, setPageHtml] = useState( <></>);
    const updatePageHtml = async () => {
  
        try {
          const NoticeboardAPIresponse = await axios.get(('http://localhost:8080' + '/noticeboard'));
          const noticeList = NoticeboardAPIresponse.data;
    
            console.log( noticeList);
    
          setPageHtml(<>
            <div >
                <div style={{width : '95%', display : 'flex', justifyContent :'end'}}>
                    <Button text={'New notice'} col={'blue'} />
                </div>
                
                {noticeList.map(RenderNotice)}
            </div>
          </>);
        }
        catch (err) {
          console.log( err);
        }
      }
      useEffect(() => {
    
        updatePageHtml();
      }, []);
  return (
    <>
        <CTAdmin />
        <h3 style={{width : '100%', textAlign : 'center'}}>Noticeboard</h3>
        {PageHtml}
    </>
  )
}



