import { useState } from 'react';
import { cn } from "../../lib/utils";
import { BackgroundBeamsWithCollision } from "../../components/ui/background_beams_with_collision";
import { Link } from 'react-router-dom';
import FeedbackAPI from "../../api/feedBackAPI"
import toast, { Toaster } from "react-hot-toast"
import Footer from '../../components/Footer/Footer';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function validateFeedBackform() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!formData.name.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.cfID = "Message is required";
    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateFeedBackform();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const response = await FeedbackAPI.submitFeedback(formData);
    if (response.success) {
      toast.success(response.message, {
        duration: 2000,
        className: "toast-success"
      })
    }
    else {
      toast.error(response.message, {
        duration: 2000,
        className: "toast-error"
      })
    }
    setFormData({ name: "", email: "", message: "" })
    setLoading(false)
  };

  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="md:mt-10 w-screen h-screen flex items-center text-white md:px-0 px-5">
          <div className="max-w-md w-full border-[#3E3E8E] mx-auto rounded-lg p-6 shadow-2xl border">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#D1D1FF] mb-6">
              Contact Us
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm md:text-base font-semibold text-[#C5C5FF] mb-2"
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={cn(
                    "w-full p-2 md:p-3 rounded border focus:outline-none focus:border-blue-400 bg-[#121232] text-gray-300 placeholder-gray-500",
                    errors.name && "border-red-500"
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

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
                  placeholder="example@domain.com"
                  className={cn(
                    "w-full p-2 md:p-3 rounded border focus:outline-none focus:border-blue-400 bg-[#121232] text-gray-300 placeholder-gray-500",
                    errors.email && "border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm md:text-base font-semibold text-[#C5C5FF] mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows="4"
                  className={cn(
                    "w-full p-2 md:p-3 rounded border focus:outline-none focus:border-blue-400 bg-[#121232] text-gray-300 placeholder-gray-500",
                    errors.message && "border-red-500"
                  )}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 md:py-3 rounded focus:outline-none transition duration-200"
                  disabled={loading}
                >
                  {!loading && "Submit"}
                  {loading && "Submitting..."}
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p className="mt-4 text-center text-[#C5C5FF]">
              Have any questions?{" "}
              <Link to="/faq" className="text-blue-400 hover:text-blue-500">
                FAQ
              </Link>
            </p>
          </div>
          <Toaster />
        </div>
      </BackgroundBeamsWithCollision>
      <Footer />
    </>
  );
}


export default ContactUs;
