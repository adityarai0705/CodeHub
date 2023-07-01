import React from "react";
import './Graphs.css';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function LanguageGraph(props) {
    let LanguageArr = []
    for (const i of Object.keys(props.languagedata.data)) {
        LanguageArr.push({
            'name': i, 'uv': props.languagedata.data[i]
        })
    }
    return (
        <div className='QuestionRatingContainer'>
            <h4 style={{ width: '100%', textAlign: 'center', color: 'red', marginTop: '50px' }}>Languages Used</h4>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={LanguageArr}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar name="name" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}