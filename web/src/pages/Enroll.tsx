import React, { useState, useRef, useEffect } from "react";

const Enroll: React.FC = () => {
  const [step, setStep] = useState(1);
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    contact: "",
    gmail: "",
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  // Auto-start camera when step === 2
  useEffect(() => {
    if (step === 2) {
      startCamera();
    }
  }, [step]);

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 320, 240);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setPhotos((prev) => [...prev, dataUrl]);
      }
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSaveEnrollment = () => {
    console.log("Employee Info:", employee);
    console.log("Captured Photos:", photos);
    alert("Enrollment completed!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Employee Enrollment
        </h2>

        {step === 1 && (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {/* --- same form as before --- */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter full name"
              />
            </div>
            {/* Department */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={employee.department}
                onChange={(e) =>
                  setEmployee({ ...employee, department: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter department"
              />
            </div>
            {/* Contact */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                required
                value={employee.contact}
                onChange={(e) =>
                  setEmployee({ ...employee, contact: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter contact number"
              />
            </div>
            {/* Gmail */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Gmail
              </label>
              <input
                type="email"
                required
                value={employee.gmail}
                onChange={(e) =>
                  setEmployee({ ...employee, gmail: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter Gmail address"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Next: Capture Face
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Step 2: Capture Different Face Views
            </h3>

            {/* Webcam Feed */}
            <video
              ref={videoRef}
              width="320"
              height="240"
              autoPlay
              playsInline
              className="mx-auto rounded-lg shadow border border-gray-300"
            ></video>

            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={capturePhoto}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
              >
                Capture Face
              </button>

              <div className="flex flex-wrap justify-center gap-3 mt-3">
                {photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt={`face-${i}`}
                    width="100"
                    className="rounded-lg border border-gray-300 shadow-sm"
                  />
                ))}
              </div>

              <canvas
                ref={canvasRef}
                width="320"
                height="240"
                className="hidden"
              />

              <button
                onClick={handleSaveEnrollment}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md transition mt-4"
              >
                Save Enrollment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enroll;
