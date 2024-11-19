import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

const ConfirmationPage = () => {
  const { registrationId } = useParams();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      try {
        const response = await fetch(`/api/registration/${registrationId}`);
        if (response.ok) {
          const data = await response.json();
          setRegistration(data);
        } else {
          const errorData = await response.json();
          setError(
            errorData.message || "Failed to fetch registration details."
          );
        }
      } catch (err) {
        setError("An error occurred while fetching registration details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationDetails();
  }, [registrationId]);

  const handleEsewaPayment = async (event) => {
    event.preventDefault();

    const esewaURL = "https://uat.esewa.com.np/epay/main";
    const params = {
      amt: registration?.totalPrice,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: registration?.totalPrice,
      pid: `registration-${registration?._id}`,
      scd: "EPAYTEST",
      su: "http://localhost:5173/payment-success",
      fu: "http://localhost:5173/payment-failure",
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = esewaURL;

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Simulating payment success for development purposes
    await updateStatus("Paid");
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(
        `/api/registration/update-registration/${registrationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setRegistration(updatedData);
        setPaymentSuccess(true);
      } else {
        console.error("Failed to update status");
      }
    } catch (err) {
      console.error("An error occurred while updating status", err);
    }
  };

  if (loading) {
    return <Spinner aria-label="Loading" />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form
      className="container mx-auto px-4 py-16 max-w-md"
      onSubmit={handleEsewaPayment}
    >
      <h1 className="text-4xl font-bold mb-8">Ticket Summary</h1>
      <div className="space-y-4">
        <div>
          <strong>Event:</strong> {registration.eventSlug}
        </div>
        <div>
          <strong>Name:</strong> {registration.name}
        </div>
        <div>
          <strong>Email:</strong> {registration.email}
        </div>
        <div>
          <strong>Phone:</strong> {registration.phone}
        </div>
        <div>
          <strong>Tickets Booked:</strong> {registration.ticketsBooked}
        </div>
        <div>
          <strong>Total Price:</strong> NPR {registration.totalPrice}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Proceed to Payment with eSewa
      </button>
    </form>
  );
};

export default ConfirmationPage;
