import { useState, useEffect } from "react";
import API from "../../api/forgetPassword";

function VerifyOTP({ onNext, toast, email }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const api = new API();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    setResendDisabled(true);
    setTimer(300); // Reset timer to 5 minutes
    try {
      const result = await api.forgetPassword(email);
      if (result.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error(result.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.verifyOtp(otp);
      if (result.success) {
        toast.success("OTP verified!");
        onNext({ otp });
      } else {
        toast.error(result.message || "Invalid OTP", { duration: 2000 });
      }
    } catch (error) {
      toast.error(error.message || "Invalid OTP", { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-lg p-6 shadow-2xl bg-[#121232]">
      <h1 className="text-3xl font-bold text-center mb-6">Verify OTP</h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-400">
          Resend OTP in: {formatTime(timer)}
        </p>
        <button
          onClick={handleResend}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition"
          disabled={resendDisabled}
        >
          Resend OTP
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP"
            className="w-full p-2 rounded bg-[#1E1E3A] text-gray-300 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOTP;
