import React from "react";
import './TeamMember.css'
import {teamData} from "./TeamData"
export default function TeamMember(){
    return (
        <>
        <div id="teamsMain">
        <div id='teamsTitleMain'>
                        Teams
                    </div>
        <div className="team-section">
      {teamData.map((categoryData) => (
        <div key={categoryData.category} className="team-category">
          <h2>{categoryData.category}</h2>
          <ul>
            {categoryData.members.map((member, index) => (
              <li key={index} className="team-member">
                <img src={member.photo} alt={member.name} className="member-photo" />
                <div className="member-info">
                  <span className="member-name">{member.name}</span><span className="member-role">{member.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
    </>
    );
}

