import { useState } from "react";
import { BackgroundBeamsWithCollision } from "../../components/ui/background_beams_with_collision";
import SendEmail from "./SendEmail";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
function ForgetPassword() {
  const [step, setStep] = useState(1); // Manage steps (1: Email, 2: OTP, 3: Reset Password)
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleNextStep = (data) => {
    if (step === 1) setEmail(data.email);
    if (step === 2) setOtp(data.otp);
    console.log(step);
    setStep((step) => step + 1);
  };

  return (
    <BackgroundBeamsWithCollision>
      <Toaster />
      <div className="w-screen h-screen flex items-center justify-center text-white px-5">
        {step === 1 && <SendEmail onNext={handleNextStep} toast={toast} />}
        {step === 2 && (
          <VerifyOTP onNext={handleNextStep} toast={toast} email={email} />
        )}
        {step === 3 && <ResetPassword toast={toast} />}
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default ForgetPassword;
