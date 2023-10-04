import React from 'react';
import './Graphs.css';
import { ResponsiveContainer, LineChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Line } from 'recharts';

export default function RatingChangesGraph(props) {

    const RatingChangeData = props.ratingdata.map((elt) => {
        let curelt = {
            'name': elt.contestName,
            'uv': elt.newRating,
            'amt': elt.newRating
        }
        return curelt;
    });


    return (
        <div className='LineContainer'>
            <h4 style={{ width: '100%', textAlign: 'center', color: 'red' }}>Contest Ratings</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={730} height={250} data={RatingChangeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line name='New Rating' type="monotone" dataKey="uv" stroke="red" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
