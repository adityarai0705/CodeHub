import { Meteors } from "../ui/Meteors";
import { Navigate } from "react-router-dom";

function ContestCard({ contestID, contestName, contestRank, ratingGain }) {
  const ratingChangeColor = ratingGain >= 0 ? "text-green-400" : "text-red-400";
  const arrow = ratingGain >= 0 ? "▲" : "▼";
  const gainValue = Math.abs(ratingGain);

  return (
    <div className="relative p-6 min-w-[300px] md:min-w-[350px] overflow-hidden rounded-2xl flex flex-col justify-end items-start transition-transform  bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] shadow-lg">
      <div
        className="absolute inset-0 border-2 rounded-2xl blur-md -z-10"
        style={{
          borderImage: "linear-gradient(to right, #10b981, #3b82f6, #ec4899) 1",
        }}
      ></div>
      <div className="relative z-10 w-full text-left">
        <h2 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {contestID}: {contestName}
        </h2>
        <p className="font-light text-base text-gray-400 mt-2">Rank: {contestRank}</p>
        <p
          className={`font-bold text-lg mt-2 ${ratingChangeColor} flex items-center`}
        >
          {arrow} {gainValue}
        </p>
        <button className="mt-4 bg-gradient-to-r from-green-400 to-teal-400 px-4 py-2 rounded-md text-gray-900 font-semibold text-sm  transition" onClick={() => { window.location.href = "https://codeforces.com/contest/" + contestID }}>
          Explore
        </button>
      </div>
      <Meteors number={3} />
    </div>
  );
}

export default function ContestDetails({ contestData }) {
  return (
    <div className="p-8 rounded-lg">
      <h3 className="text-3xl md:text-5xl text-center font-bold text-transparent bg-clip-text text-[#05CBDC] mb-8">
        Contests
      </h3>
      <div className="overflow-x-auto w-full">
        <div className="flex space-x-6">
          {contestData
            .slice()
            .reverse()
            .map((contest, index) => (
              <ContestCard
                key={index}
                contestID={contest.contestId}
                contestName={contest.contestName}
                contestRank={contest.rank}
                ratingGain={contest.newRating - contest.oldRating}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
