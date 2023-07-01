import React from 'react';
import './Graphs.css';
import { ResponsiveContainer, LineChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Line } from 'recharts';

export default function ContestRankGraph(props) {

    const RatingChangeData = props.ratingdata.map((elt) => {
        let curelt = {
            'name': elt.contestName,
            'uv': (100001 - elt.rank) / 100000,
            'amt': elt.newRating
        }
        return curelt;
    });


    return (
        <div className='LineContainer'>
            <h4 style={{ width: '100%', textAlign: 'center', color: 'blue' }}>Contest Performance Index</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={730} height={250} data={RatingChangeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line name='Perfromance Index (PI for first rank is 1)' type="monotone" dataKey="uv" stroke="blue" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
