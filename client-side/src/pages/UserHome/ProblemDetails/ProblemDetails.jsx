import React, { useEffect, useState } from 'react';
import './ProblemDetails.css';


function useCurrentWidth() {
    const getWidth = () => window.innerWidth
    let [width, setWidth] = useState(getWidth());
    useEffect(() => {
        const resizeListener = () => {
            setWidth(getWidth())
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    return width;
}


function ProblemCard(props) {
    const verdictData = [
        {
            "name": "Challenged",
            "value": "CHALLENGED",
            "fill": "#9E00FF"
        },
        {
            "name": "Compilation error",
            "value": "COMPILATION_ERROR",
            "fill": "#FF4A4A"
        },
        {
            "name": "Crashed",
            "value": "CRASHED",
            "fill": "#005C90"
        },
        {
            "name": "Failed",
            "value": "FAILED",
            "fill": "#630000"
        },
        {
            "name": "Idleness limit exceeded",
            "value": "IDLENESS_LIMIT_EXCEEDED",
            "fill": "#0078BC"
        },
        {
            "name": "Input preparation crashed",
            "value": "INPUT_PREPARATION_CRASHED",
            "fill": "#003A5A"
        },
        {
            "name": "Memory limit exceeded",
            "value": "MEMORY_LIMIT_EXCEEDED",
            "fill": "#CA9D00"
        },
        {
            "name": "Accepted",
            "value": "OK",
            "fill": "#478E00"
        },
        {
            "name": "Partial",
            "value": "PARTIAL",
            "fill": "#355500"
        },
        {
            "name": "Presentation error",
            "value": "PRESENTATION_ERROR",
            "fill": "#310063"
        },
        {
            "name": "Rejected",
            "value": "REJECTED",
            "fill": "#FF7F57"
        },
        {
            "name": "Runtime error",
            "value": "RUNTIME_ERROR",
            "fill": "#5C3700"
        },
        {
            "name": "Security violated",
            "value": "SECURITY_VIOLATED",
            "fill": "#683E69"
        },
        {
            "name": "Skipped",
            "value": "SKIPPED",
            "fill": "#2C2C2C"
        },
        {
            "name": "Testing",
            "value": "TESTING",
            "fill": "#008B37"
        },
        {
            "name": "Time limit exceeded",
            "value": "TIME_LIMIT_EXCEEDED",
            "fill": "#AB7100"
        },
        {
            "name": "Wrong answer",
            "value": "WRONG_ANSWER",
            "fill": "#FF0000"
        }
    ];
    let color = "";
    let name = "";
    for (let i of verdictData) {
        if (props.verdict === i.value) {
            color = i.fill;
            name = i.name;
        }
    }
    let userSubmissionRating = {}
    for (let i = 800; i <= 3500; i += 100) {
        userSubmissionRating[(i / 100) - 8] = "";
    }

    userSubmissionRating[0] = '#323232'; // 800
    userSubmissionRating[1] = '#323232'; // 900
    userSubmissionRating[2] = '#323232'; // 1000
    userSubmissionRating[3] = '#323232'; // 1100
    userSubmissionRating[4] = '#0C5500'; // 1200
    userSubmissionRating[5] = '#0C5500'; // 1300
    userSubmissionRating[6] = '#00A8B2'; // 1400
    userSubmissionRating[7] = '#00A8B2'; // 1500
    userSubmissionRating[8] = '#0400B2'; // 1600
    userSubmissionRating[9] = '#0400B2'; // 1700
    userSubmissionRating[10] = '#0400B2'; // 1800
    userSubmissionRating[11] = '#9A00B2'; // 1900
    userSubmissionRating[12] = '#9A00B2'; // 2000
    userSubmissionRating[13] = '#B28100'; // 2100
    userSubmissionRating[14] = '#B28100'; // 2200
    userSubmissionRating[15] = '#866000'; // 2300
    userSubmissionRating[16] = '#9A3333'; // 2400
    userSubmissionRating[17] = '#9A3333'; // 2500
    userSubmissionRating[18] = '#FC0000'; // 2600
    userSubmissionRating[19] = '#FC0000)'; // 2700
    userSubmissionRating[20] = '#FC0000'; // 2800
    userSubmissionRating[21] = '#FC0000'; // 2900
    userSubmissionRating[22] = '#9E0000'; // 3000
    userSubmissionRating[23] = '#9E0000'; // 3100
    userSubmissionRating[24] = '#9E0000'; // 3200
    userSubmissionRating[25] = '#9E0000'; // 3300
    userSubmissionRating[26] = '#9E0000'; // 3400
    userSubmissionRating[27] = '#9E0000'; // 3500

    let colordifficulty = userSubmissionRating[(Number(props.difficulty) / 100) - 8];

    return useCurrentWidth() > 500 ? (
        <div className="ProblemCardBox">
            <div className="ProblemCardUpperPart">
                <div className="problemName">{props.index} : {props.name}</div>
                <div style={{ color: color }} className="ProblemCardVerdict">{name}</div>
            </div>
            <div className="ProblemCardLowerPart">
                <div className="DifficultyLine"><div>Difficulty: </div><div style={{ color: colordifficulty }}><b>{props.difficulty}</b></div></div>
                <div color={{ color }}><b>{props.time}</b> ms</div>
            </div>
        </div>) : (<div className="ProblemCardBox">
            <div className="problemName">{props.index} : {props.name}</div>

            <div className="DifficultyLine"><div>Difficulty: </div><div style={{ color: colordifficulty }}><b>{props.difficulty}</b></div></div>
            <div>Time : <b>{props.time}</b> ms</div>
            <div style={{ color: color, marginTop: '30px' }} className="ProblemCardVerdict">{name}</div>
        </div>
    )
}


export default function ProblemDetails(props) {

    //  const problemCards = props.problemData.map( curProblem => <ProblemCard index={ curProblem.problem.index} name={ curProblem.problem.name} difficulty={ curProblem.problem.rating} verdict={ curProblem.verdict} time={ curProblem.timeConsumedMillis}/>)

    const [index, setIndex] = useState(0);
    let totalPage = Math.ceil(props.problemData.length / 20);

    let st = index * 20;
    let en = st + 20;
    let problemCards = [];
    let N = props.problemData.length;

    
    for (let i = st; i < Math.min(en, N); i++) {
        let curProblem = props.problemData[i];
        problemCards[i - st] = <ProblemCard key={i} index={curProblem.problem.index} name={curProblem.problem.name} difficulty={curProblem.problem.rating} verdict={curProblem.verdict} time={curProblem.timeConsumedMillis} />
    }


    return (
        <div className='problemDetailsContainer'>
            <h4 style={{ padding: '20px', color: 'red' }}><b>Problems solved</b></h4>
            <div className='buttonContainerPrbolem'>
                <div className='ChangePageButton' onClick={() => setIndex(index > 0 ? index - 1 : index)}>Prev</div>
                <div> Page : <b><span style={{ color: 'blue', fontSize: 'x-large' }}>{index + 1}</span></b>/{totalPage}</div>
                <div className='ChangePageButton' onClick={() => { setIndex(index < totalPage - 1 ? index + 1 : index); console.log(index) }}>Next</div>
            </div>
            <div className='problemCardsContainer'>
                {problemCards}
            </div>
        </div>
    );
}
