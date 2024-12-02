import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 max-w-md text-center">
      <h1 className="text-4xl font-bold mb-8 text-green-600">
        Payment Successful!
      </h1>
      <p className="text-lg mb-4">Thank you for registering for the event.</p>
      <button
        onClick={() => navigate("/dashboard?tab=dash-user")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
