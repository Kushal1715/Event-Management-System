import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div className="py-32 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-500 flex items-center justify-center text-white">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">
          Let’s work together on your next Event{" "}
          <span role="img" aria-label="balloon">
            🎈
          </span>
        </h1>
        <p className="text-2xl mb-8">
          Call to action (CTA) is a marketing term for any device designed to
          prompt an immediate response or encourage an immediate sale.
        </p>
        <button
          className="bg-blue-600 text-white font-medium py-3 px-8 rounded-full hover:bg-blue-800 transition duration-300 text-lg"
          onClick={() => navigate("/contact")}
        >
          Let’s Get Started →
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
