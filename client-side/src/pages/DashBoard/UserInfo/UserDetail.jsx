// import React from 'react'
// import './UserDetail.css'

// export default function UserDetail(props) {
//   return (
//     <div className='UserDetailOuterContainer'>
//         <div className='userdetailtext'><div className="userdetaillabel">Name</div> <div className='userdetaildata'>{props.userdetail.name}</div> </div> <br/>
//         <div className='userdetailtext'><div className="userdetaillabel">Handle</div> <div className='userdetaildata'>{props.userdetail.handle}</div> </div> <br/>
//         <div className='userdetailtext'><div className="userdetaillabel">Rating</div> <div className='userdetaildata'>{props.userdetail.rating}</div> </div> <br/>
//         <div className='userdetailtext'><div className="userdetaillabel">Contributions</div> <div className='userdetaildata'>{props.userdetail.contributions}</div> </div> <hr/>
//         <div className='userdetailtext'><div className="userdetaillabel">Contests given</div> <div className='userdetaildata'>{props.userdetail.contestGiven}</div> </div> <br/>
//         <div className='userdetailtext'><div className="userdetaillabel">Problems Solved</div> <div className='userdetaildata'>{props.userdetail.problemSolved}</div> </div> <br/>
//         <div className='userdetailtext'><div className="userdetaillabel">Total submissions made</div> <div className='userdetaildata'>{props.userdetail.submissionsMade}</div> </div> <br/>
//         <div className='userdetailtext'><div className="userdetaillabel">Best rank</div> <div className='userdetaildata'>{props.userdetail.bestRank}</div> </div> <br/>
//         <div className='userdetailtext'><div className="userdetaillabel">Highest rating gain</div> <div className='userdetaildata'>{props.userdetail.HighestRatingGain}</div> </div> <br/>
//     </div>
//   )
// }



import './UserDetail.css';

export default function UserDetail({ userDetail }) {
    const details = [
        { label: "Name", data: userDetail.name },
        { label: "Handle", data: userDetail.handle },
        { label: "Rating", data: userDetail.rating },
        { label: "Contributions", data: userDetail.contributions },
        { label: "Contests Given", data: userDetail.contestGiven },
        { label: "Problems Solved", data: userDetail.problemSolved },
        { label: "Total Submissions Made", data: userDetail.submissionsMade },
        { label: "Best Rank", data: userDetail.bestRank },
        { label: "Highest Rating Gain", data: userDetail.HighestRatingGain },
    ];

    return (
        <div>
            <div className="UserDetailOuterContainer">
                <h4>User Details</h4>
                {details.map((detail, index) => (
                    <div className="userdetailtext" key={index}>
                        <div className="userdetaillabel">{detail.label}</div>
                        <div className="userdetaildata">{detail.data}</div>
                    </div>
                ))}
                <hr />
            </div>
            <br />
        </div>
    );
}
