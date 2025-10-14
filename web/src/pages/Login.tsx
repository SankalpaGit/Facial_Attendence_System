import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const handleEmailVerify = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", { email });
      console.log("OTP sent:", res.data);
      setStep("otp");
    } catch (err: any) {
      console.error(err.response?.data);
      alert(err.response?.data?.detail || "Failed to send OTP");
    } finally {
      setLoading(false);
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

  // Step 2: Verify OTP
  const handleLogin = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return setError(true);
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/verify-otp/", {
        email,
        otp: enteredOtp,
      });

      console.log("Login success:", res.data);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.response?.data);
      setError(true);
    } finally {
      setLoading(false);
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
        <source src="http://cdn.pixabay.com/video/2017/06/10/9772-221163248_large.mp4" type="video/mp4" />
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
