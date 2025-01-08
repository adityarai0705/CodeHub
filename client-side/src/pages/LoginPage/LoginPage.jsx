import { useState } from "react";
import { cn } from "../../lib/utils";
import { BackgroundBeamsWithCollision } from "../../components/ui/background_beams_with_collision";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Dispatch Login Action
    const resultAction = await dispatch(login(formData));

    // Handle Redux State Update
    if (login.fulfilled.match(resultAction)) {
      toast.success("Login successful", {
        duration: 2000,
        className: "toast-success",
      });
      navigate(`/dashBoard`);
    } else {
      toast.error(error || "Error Occured! Please Try Again", {
        duration: 2000,
        className: "toast-error",
      });
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="w-screen h-screen flex justify-center items-center text-white md:px-0 px-5">
        <div className="max-w-md w-full border-[#3E3E8E] mx-auto rounded-lg p-6 shadow-2xl border">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#D1D1FF] mb-6">
            Login to your account
          </h1>
          <p style={{ textAlign: "center" }}>
            Use Chrome Desktop(version:120.0 or higher)
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-semibold text-[#C5C5FF] mb-2"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className={cn(
                  "w-full p-2 md:p-3 rounded border focus:outline-none focus:border-blue-400 bg-[#121232] text-gray-300 placeholder-gray-500",
                  errors.email && "border-red-500"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm md:text-base font-semibold text-[#C5C5FF] mb-2"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="****************"
                className={cn(
                  "w-full p-2 md:p-3 rounded border focus:outline-none focus:border-blue-400 bg-[#121232] text-gray-300 placeholder-gray-500",
                  errors.password && "border-red-500"
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 md:py-3 rounded focus:outline-none transition duration-200"
                disabled={loading}
              >
                {!loading && "Sign In"}
                {loading && "Signing In..."}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-center text-[#C5C5FF]">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-blue-400 hover:text-blue-500">
              Sign Up
            </Link>
          </p>
          {/* Forgot Password Link */}
          <p className="mt-4 text-center text-[#C5C5FF]">
            Forgot Password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-500"
            >
              Reset Password
            </Link>
          </p>
        </div>
        <Toaster />
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default Login;
