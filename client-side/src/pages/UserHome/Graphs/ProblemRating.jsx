import React from 'react';
import './Graphs.css';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export default function QuestionRatingGraphs(props) {
    let questionRatingdata = [];

    for (let i = 0; i < 28; i++) {
        if (props.questionratingdata[i].uv !== 0)
            questionRatingdata.push(props.questionratingdata[i]);
    }


    return (
        <div className='QuestionRatingContainer'>
            <h4 style={{ width: '100%', textAlign: 'center', color: 'red' }}>Solved Problems (Rating)</h4>
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={questionRatingdata}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Number of problems solved" dataKey="uv" fill="red" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
