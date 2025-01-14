import React from 'react';
import './Leaderboard.css'; // Ensure this includes styles for user avatars, ranks, etc.
import { useNavigate } from 'react-router-dom';
function LeaderUser(props) {
    const { avatar, name, rank, rating, positionChange, title, cfID } = props;
    const navigate = useNavigate();
    // Compare rating with the leaderboard
    // Rank color based on Codeforces rank
    const rankColor = getRankColor(title);

    // Handle user click to navigate to the user's Codeforces profile
    const handleUserClick = () => {
        navigate(`/get-codeforces-profile/${cfID}`);
    };
    const handleCodeforcesRedirect = () => {
        window.open(`https://codeforces.com/profile/${cfID}`, "_blank");
    };

    return (
        <div className="leader-box" onClick={handleUserClick}>
            <div className="leader-info">
            <button className='p-2 bg-transparent border-none' onClick={()=>{handleCodeforcesRedirect()}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="code-forces"
                width="24"
                height="24"
            >
                <path fill="#F44336" d="M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z" />
                <path fill="#2196F3" d="M13.5 21a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5h3z" />
                <path fill="#FFC107" d="M0 19.5c0 .828.673 1.5 1.5 1.5h3A1.5 1.5 0 0 0 6 19.5V9a1.5 1.5 0 0 0-1.5-1.5h-3C.673 7.5 0 8.172 0 9v10.5z" />
            </svg>
        </button>
                <img src={avatar} alt={`${name} Avatar`} className="user-avatar" />
                <b className='p-2 text-gray-600'>#{rank}</b><span className="leader-rank" style={{ color: rankColor }}>
                     {name}
                </span>
                
            </div>
            

            <div className="leader-rating">
            <div>
                {positionChange === 0 && (
                    <span style={{ color: 'gray' }}>
                        <span>&#8594;</span> 0
                    </span>
                )}
                {positionChange > 0 && (
                    <span style={{ color: 'green' }}>
                        <span>&#9650;</span> +{positionChange}
                    </span>
                )}
                {positionChange < 0 && (
                    <span style={{ color: 'red' }}>
                        <span>&#9660;</span> {positionChange}
                    </span>
                )}
            </div>
            </div>
        </div>
    );
}

function getRankColor(rank) {
    switch(rank.toLowerCase()) {
        case 'newbie': return '#A0A0A0'; // gray
        case 'pupil': return '#66CDAA'; // medium sea green
        case 'specialist': return '#40E0D0'; // turquoise (cyan)
        case 'expert': return '#4682B4'; // steel blue (blue)
        case 'candidate master': return '#8A2BE2'; // blue violet (purple)
        case 'master': return '#FF7F50'; // coral (orange)
        case 'international master': return '#B22222'; // firebrick (red)
        case 'grandmaster': return '#8B0000'; // dark red
        case 'international grandmaster': return '#8B0000'; // dark red
        case 'legendary grandmaster': return '#8B0000'; // dark red
        default: return '#000000'; // black
    }
}

export default LeaderUser;
