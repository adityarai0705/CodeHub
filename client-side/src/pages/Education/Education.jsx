import React from 'react'
import '../pages.css'
import './Education.css'

// educationCategories is a dummy data
const educationCategories = [
    {
        title : 'Editorials',
        _id : 'dummy232234'
    },
    {
        title : 'Dynamic Programming',
        _id : 'dummy232234'
    },
    {
        title : 'Greedy',
        _id : 'dummy232234'
    },
    {
        title : 'Graphs',
        _id : 'dummy232234'
    },
    {
        title : 'Backtracking',
        _id : 'dummy232234'
    },
    {
        title : 'C/C++',
        _id : 'dummy232234'
    },
    {
        title : 'Java',
        _id : 'dummy232234'
    },
    {
        title : 'Game Theory',
        _id : 'dummy232234'
    }
];

function EduSection(props)
{
    return (
        <div>
            <div className="super-box">
            <div className="edu-box">
                <div className="edu-title">{props.title}</div>
            </div>
            </div>
        </div>
    );
}

function CreateList(props)
{
    return (
        <EduSection
         key={props._id}
         title={props.title}
         />
    );
}

export default function Education() {
  return (
    <div className="background-pink-blue">
        <div className='education-heading'>Education</div>
        <div className='EducationOuterContainer'>
            <div className='EducationInnerContainer'>
                {educationCategories.map(EduSection)}
            </div>
        </div>
    </div>
  )
}