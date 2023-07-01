import React from 'react'
import './UserDetail.css'

export default function UserDetail(props) {
  return (
    <div className='UserDetailOuterContainer'>
        <div className='userdetailtext'><div className="userdetaillabel">Name</div> <div className='userdetaildata'>{props.userdetail.name}</div> </div> <br/>
        <div className='userdetailtext'><div className="userdetaillabel">Handle</div> <div className='userdetaildata'>{props.userdetail.handle}</div> </div> <br/>
        <div className='userdetailtext'><div className="userdetaillabel">Rating</div> <div className='userdetaildata'>{props.userdetail.rating}</div> </div> <br/>
        <div className='userdetailtext'><div className="userdetaillabel">Contributions</div> <div className='userdetaildata'>{props.userdetail.contributions}</div> </div> <hr/>
        <div className='userdetailtext'><div className="userdetaillabel">Contests given</div> <div className='userdetaildata'>{props.userdetail.contestGiven}</div> </div> <br/>
        <div className='userdetailtext'><div className="userdetaillabel">Problems Solved</div> <div className='userdetaildata'>{props.userdetail.problemSolved}</div> </div> <br/>
        <div className='userdetailtext'><div className="userdetaillabel">Total submissions made</div> <div className='userdetaildata'>{props.userdetail.submissionsMade}</div> </div> <br/>
        <div className='userdetailtext'><div className="userdetaillabel">Best rank</div> <div className='userdetaildata'>{props.userdetail.bestRank}</div> </div> <br/>
        <div className='userdetailtext'><div className="userdetaillabel">Highest rating gain</div> <div className='userdetaildata'>{props.userdetail.HighestRatingGain}</div> </div> <br/>
    </div>
  )
}
