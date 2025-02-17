/**
 * @fileoverview Verify Codeforces ID page.
 */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { BackgroundBeamsWithCollision } from "../../components/ui/background_beams_with_collision";
import authAPI from "../../api/authAPI";
import { useSelector } from "react-redux";

function VerifyCfID() {

    const TOTAL_TIME = 120; // Total time in seconds (2 minutes)
    const problemLink = "https://codeforces.com/problemset/problem/231/A"; // Problem to be submitted and get compilation error.

    // State variables
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [timerExpired, setTimerExpired] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();
    const {user}= useSelector((state)=> state.auth);

    // Codeforces ID and Problem ID
    const cfID = location.state?.cfID || user.cfID;
    const problemID = "231A";
    // console.log(cfID, problemID);


  // Handle the timer
    useEffect(() => {
        if (timeLeft > 0 && !timerExpired) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
                localStorage.setItem("timeLeft", timeLeft - 1);
            }, 1000)
            return () => clearTimeout(timer);
        }
        else if (timeLeft == 0) {
            setTimerExpired(true);
        }
    }, [timeLeft])


 // Check if timer is already running.
    useEffect(() => {
        toast.dismiss();
        const startTime = localStorage.getItem("startTime");
        if (startTime) {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < TOTAL_TIME * 1000) {
                setTimeLeft(Math.ceil((TOTAL_TIME * 1000 - elapsedTime) / 1000));
                setTimerExpired(false);
            }
            else {
                setTimerExpired(true);
            }
        }
        else {
            setTimerExpired(true);
        }
    }, [])

    // Handle the start timer button.
    async function handleStartTimer() {
        setTimeLeft(TOTAL_TIME - 1);
        setTimerExpired(false);
        //Save current start time in local storage
        const response = await authAPI.handleRequestCfVerification({ cfID, problemID });
        console.log(response.message);
        if (!response.success) {
            setTimeLeft(120);
            setTimerExpired(true);
            console.log("Error occured")
        }
        const currentTime = new Date().getTime();
        localStorage.setItem("startTime", currentTime);
    }

    // Handle the verify button.
    async function handleVerify() {
        setTimerExpired(true);
        setTimeLeft(TOTAL_TIME);
        localStorage.removeItem("startTime");
        const response = await authAPI.handleVerifyCfID({ cfID, problemID });
        if (response.success) {
            toast.success("Codeforces ID verified successfully", {
                duration: 2000,
                className: "toast-success"
            })
            navigate("/dashboard");
        }
        else {
            toast.error(response.message, {
                duration: 2000,
                className: "toast-error"
            })
        }
    }

    // Format the time in MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        //background beams with collision effect.
        <BackgroundBeamsWithCollision>
            <div className="w-screen h-screen flex justify-center items-center text-white">
                <div className="p-8 bg-[#0A0A2A] border-2 border-[#3E3E8E] rounded-lg shadow-lg text-center w-11/12 max-w-md">

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-4 text-[#D1D1FF]">Codeforces ID Verification</h1>

                    {/* Instructions */}
                    <p className="text-[#C5C5FF] text-sm md:text-base mb-6 leading-relaxed">
                        To verify your <span className="text-[#5B5BFF] font-semibold">Codeforces ID</span>, you need to:
                        <ul className="list-disc list-inside mt-4 text-left">
                            <li>
                                Go to the problem <span className="text-[#FFD700]">231A</span> (linked below).
                            </li>
                            <li>
                                Submit a solution that intentionally causes a <span className="text-red-500 font-bold">compilation error</span>.
                            </li>
                            <li>
                                Ensure this is done within <span className="text-green-500 font-semibold">2 minutes</span> of starting this process.
                            </li>
                        </ul>
                    </p>

                    {/* Timer */}
                    <div className="mb-6">
                        <span className="text-2xl font-semibold text-[#FFD700]">
                            {`Time Left: ${formatTime(timeLeft)}`}
                        </span>
                    </div>

                    {/* Start Timer Button */}
                    <button
                        onClick={() => handleStartTimer()}
                        className="w-full mb-4 py-2 px-4 rounded font-bold bg-[#5B5BFF] hover:bg-[#4A4AFF] text-white focus:outline-none focus:shadow-outline transition duration-200"
                        disabled={!timerExpired} >
                        Start Timer
                    </button>

                    {/* Problem Link */}
                    <a
                        href={problemLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mb-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                    >
                        Go to Problem
                    </a>

                    {/* Verify Button */}
                    <button
                        onClick={() => handleVerify()}
                        className={`w-full py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline transition duration-200 ${timerExpired ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"}`}
                        disabled={timerExpired}
                    >
                        {timerExpired ? "Verification Disabled" : "Verify Submission"}
                    </button>

                </div>
                <Toaster />
            </div>
        </BackgroundBeamsWithCollision>
    );
}

export default VerifyCfID;
