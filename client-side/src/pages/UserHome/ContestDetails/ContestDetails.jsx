import React from 'react';
import "./ContestDetails.css";

function ContestCard(props) {

    let ratingChangeColor = props.ratingGain >= 0 ? 'green' : 'red';
    let arrow = props.ratingGain >= 0 ? <b>&#9650;</b> : <b>&#9660;</b>;

    let ratingGain = props.ratingGain;
    if (ratingGain < 0) ratingGain *= -1;


    return (
        <div className='contestCard'>
            <div className='contestCardTop'>
                <b>{props.contestID} : {props.contestName}</b>
            </div>
            <div className='contestCardBottom'>
                <div className='contestCardBtext'>
                    <b>Rank : {props.contestRank}</b>
                </div>
                <div className='contestCardBtext' style={{ color: ratingChangeColor, fontSize: 'x-large' }}>
                    <b>{arrow}{ratingGain}</b>
                </div>
            </div>
        </div>
    );
}


export default function ContestDetails(props) {
    var tempcontestCards = props.contestData;
    let n = tempcontestCards.length;

    let contestCards = [];

    for (let i = 0; i < n; i++) {
        contestCards[i] = tempcontestCards[n - i - 1];
    }

    contestCards = contestCards.map( (contest, Index) => <ContestCard key={Index} contestID={contest.contestId} contestName={contest.contestName} contestRank={contest.rank} ratingGain={contest.newRating - contest.oldRating} />);

    return (
        <div className='ContestDetailsContainer'>
            <h4 style={{ padding: '20px', color: 'red' }}><b>Contests</b></h4>
            <div className='contestCardsContainer'>
                {contestCards}
            </div>
        </div>
    );
}
