export default function UserProfile({ name, rank, image, userDetail }) {
  const rankStyles = {
    newbie: {
      bg: "bg-gray-800",
      text: "text-gray-400",
      title: "Newbie",
    },
    pupil: {
      bg: "bg-green-800",
      text: "text-green-400",
      title: "Pupil",
    },
    specialist: {
      bg: "bg-blue-800",
      text: "text-blue-400",
      title: "Specialist",
    },
    expert: {
      bg: "bg-purple-800",
      text: "text-purple-400",
      title: "Expert",
    },
    "candidate master": {
      bg: "bg-red-800",
      text: "text-red-400",
      title: "Candidate Master",
    },
    master: {
      bg: "bg-yellow-800",
      text: "text-yellow-400",
      title: "Master",
    },
    "international master": {
      bg: "bg-orange-800",
      text: "text-orange-400",
      title: "International Master",
    },
    grandmaster: {
      bg: "bg-pink-800",
      text: "text-pink-400",
      title: "Grandmaster",
    },
    "international grandmaster": {
      bg: "bg-indigo-800",
      text: "text-indigo-400",
      title: "International Grandmaster",
    },
    "legendary grandmaster": {
      bg: "bg-rose-800",
      text: "text-rose-400",
      title: "Legendary Grandmaster",
    },
    unrated: {
      bg: "bg-gray-800",
      text: "text-gray-500",
      title: "Unrated",
    },
  };

  const style = rankStyles[rank] || rankStyles.unrated;

  const details = [
    { label: "Name", data: userDetail.name },
    { label: "Handle", data: userDetail.handle },
    { label: "Rating", data: userDetail.rating },
    { label: "Contributions", data: userDetail.contributions },
    { label: "Contests Given", data: userDetail.contestGiven },
    { label: "Problems Solved", data: userDetail.problemSolved },
    { label: "Total Submissions Made", data: userDetail.submissionsMade },
    { label: "Best Rank", data: userDetail.bestRank },
    { label: "Highest Rating Gain", data: userDetail.HighestRatingGain },
  ];

  return (
    <div className=" flex flex-col items-center py-12 px-6 text-gray-100">
      {/* Profile Section */}
      <div className="bg-gray-900 shadow-md border-2 border-white shadow-white/[0.4] rounded-lg p-8 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 w-full max-w-4xl">

        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center items-center">
          <img
            className="rounded-full w-32 h-32 object-cover shadow-md"
            src={image}
            alt={`${name}'s profile`}
          />
        </div>

        {/* Name and Rank */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">{name}</h2>
          <div
            className={`py-1 px-3 text-sm font-semibold rounded-full inline-block ${style.bg} ${style.text}`}
          >
            {style.title}
          </div>
        </div>

      </div>

      {/* Details Section */}
      <div className="mt-12 space-y-8 w-full max-w-4xl">
        {/* Highest Rank */}
        <div className="bg-gray-900 shadow-md border-2 border-white rounded-lg p-6 flex justify-between items-center">
          <div className="text-lg font-bold text-gray-100">Highest Rank</div>
          <div
            className={`py-1 px-3 text-sm font-medium rounded-md ${style.bg} ${style.text}`}
          >
            {userDetail.bestRank || "Not Ranked"}
          </div>
        </div>

        {/* User Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map((detail, index) => (
            <div
              key={index}
              className="bg-gray-900 shadow-md border-2 border-white shadow-white/[0.3] rounded-lg p-4 flex justify-between items-center"
            >
              <span className="text-gray-400 font-medium">{detail.label}</span>
              <span className="text-gray-100 font-semibold">{detail.data}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
