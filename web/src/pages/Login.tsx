import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(false);

  const handleEmailVerify = () => {
    if (email.trim() !== "") {
      setStep("otp");
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(false);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://videocdn.cdnpk.net/videos/6ed7243a-1450-43d0-a3ff-c2cfcc6427fa/horizontal/previews/clear/large.mp4?token=exp=1759290547~hmac=2f9d828ac4fe5210ccb4aedc61574919862e4f505026c4528604c91147334619" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Transparent Glassmorphism Form */}
      <div className="relative z-10 bg-white/20 backdrop-blur-xs p-8 rounded-lg shadow-lg w-full max-w-sm border border-white/30">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400 drop-shadow-lg">
          {step === "email" ? "HR Login" : "Enter OTP"}
        </h2>

        {step === "email" && (
          <div>
            <input
              type="email"
              placeholder="Enter Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/60"
            />
            <button
              onClick={handleEmailVerify}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 shadow-md"
            >
              Verify Account
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="flex flex-col items-center">
            <div className="flex space-x-2 mb-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className={`w-10 h-12 text-center text-lg border rounded focus:outline-none bg-white/60 ${
                    error
                      ? "border-red-500"
                      : otp.join("").length === 6 && otp.join("") === "123456"
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 shadow-md"
            >
              Login as HR
            </button>
            {error && (
              <p className="text-red-500 mt-2 text-sm">
                Invalid OTP, please try again.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
