import React from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import './Graphs.css';


export default function VerditcGraph(props) {
    const verdictData = [
        {
            "name": "Challenged",
            "value": props.verdictdata.CHALLENGED,
            "fill": "#9E00FF"
        },
        {
            "name": "Compilation error",
            "value": props.verdictdata.COMPILATION_ERROR,
            "fill": "#FF4A4A"
        },
        {
            "name": "Crashed",
            "value": props.verdictdata.CRASHED,
            "fill": "#005C90"
        },
        {
            "name": "Failed",
            "value": props.verdictdata.FAILED,
            "fill": "#630000"
        },
        {
            "name": "Idleness limit exceeded [ILE]",
            "value": props.verdictdata.IDLENESS_LIMIT_EXCEEDED,
            "fill": "#0078BC"
        },
        {
            "name": "Input preparation crashed",
            "value": props.verdictdata.INPUT_PREPARATION_CRASHED,
            "fill": "#003A5A"
        },
        {
            "name": "Memory limit exceeded [MLE]",
            "value": props.verdictdata.MEMORY_LIMIT_EXCEEDED,
            "fill": "#CA9D00"
        },
        {
            "name": "Accepted [AC]",
            "value": props.verdictdata.OK,
            "fill": "#478E00"
        },
        {
            "name": "Partial",
            "value": props.verdictdata.PARTIAL,
            "fill": "#355500"
        },
        {
            "name": "Presentation error",
            "value": props.verdictdata.PRESENTATION_ERROR,
            "fill": "#310063"
        },
        {
            "name": "Rejected",
            "value": props.verdictdata.REJECTED,
            "fill": "#FF7F57"
        },
        {
            "name": "Runtime error [RE]",
            "value": props.verdictdata.RUNTIME_ERROR,
            "fill": "#5C3700"
        },
        {
            "name": "Security violated",
            "value": props.verdictdata.SECURITY_VIOLATED,
            "fill": "#683E69"
        },
        {
            "name": "Skipped",
            "value": props.verdictdata.SKIPPED,
            "fill": "#2C2C2C"
        },
        {
            "name": "Testing",
            "value": props.verdictdata.TESTING,
            "fill": "#008B37"
        },
        {
            "name": "Time limit exceeded [TLE]",
            "value": props.verdictdata.TIME_LIMIT_EXCEEDED,
            "fill": "#AB7100"
        },
        {
            "name": "Wrong answer [WA]",
            "value": props.verdictdata.WRONG_ANSWER,
            "fill": "#FF0000"
        }
    ];
    return (
        <div style={{ marginBottom: '50px' }}>
            <h4 style={{ width: '100%', textAlign: 'center', color: 'black' }}>Submision verdicts</h4>
            <div className='VerdictContainer'>
                <div style={{ width: '250px', minWidth: '250px' }}>
                    {verdictData.map((verdict, index) => < div className='VerdictLegendItems' key={index} style={{ color: verdict.fill }}> {verdict.name} : {verdict.value} </div>)}
                </div>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart >
                        <Pie data={verdictData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={'100%'} fill="#82ca9d" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
