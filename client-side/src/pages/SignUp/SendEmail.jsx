import { useState } from "react";
import API from "../../api/forgetPassword";

function SendEmail({ onNext, toast }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const api = new API();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.forgetPassword(email);
      toast.success("OTP sent to your email!");
      onNext({ email });
    } catch (error) {
      toast.error(error.message || "Failed to send OTP", { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-lg p-6 shadow-2xl bg-[#121232]">
      <h1 className="text-3xl font-bold text-center mb-6">Forget Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 rounded bg-[#1E1E3A] text-gray-300 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

export default SendEmail;
