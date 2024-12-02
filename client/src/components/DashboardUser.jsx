import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

const DashboardUser = () => {
  const [registrationDetails, setRegistrationDetails] = useState([]);
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `/api/registration/detail/${currentUser._id}`
        );
        const data = await response.json();
        console.log(data);
        setRegistrationDetails(data);
      } catch (error) {
        console.error("Error fetching registration details:", error);
      }
    };

    fetchDetails();
  }, [currentUser._id]);

  const handleDownloadTicket = (registration) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Event Ticket", 105, 20, { align: "center" });

    // Event Details
    doc.setFontSize(12);
    doc.text(`Event Name: ${registration.eventSlug}`, 20, 40);
    doc.text(`Name: ${registration.name}`, 20, 50);
    doc.text(`Email: ${registration.email}`, 20, 60);
    doc.text(`Phone: ${registration.phone}`, 20, 70);
    doc.text(`Tickets: ${registration.ticketsBooked}`, 20, 80);
    doc.text(`Total Price: Rs. ${registration.totalPrice}`, 20, 90);
    doc.text(
      `Registration Date: ${new Date(
        registration.registrationDate
      ).toLocaleString()}`,
      20,
      100
    );
    doc.text(`Status: ${registration.status}`, 20, 110);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your registration!", 105, 140, { align: "center" });

    // Save the PDF
    doc.save(`${registration.eventSlug}_ticket.pdf`);
  };

  return (
    <div className="container py-16 px-4">
      <h1 className="text-xl font-bold mb-8 text-center">Your Registrations</h1>
      {registrationDetails.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Event Name</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Tickets</th>
                <th className="border px-4 py-2">Total Price</th>
                <th className="border px-4 py-2">Registration Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrationDetails.map((registration) => (
                <tr key={registration._id}>
                  <td className="border px-4 py-2">{registration.eventSlug}</td>
                  <td className="border px-4 py-2">{registration.name}</td>
                  <td className="border px-4 py-2">{registration.email}</td>
                  <td className="border px-4 py-2">{registration.phone}</td>
                  <td className="border px-4 py-2">
                    {registration.ticketsBooked}
                  </td>
                  <td className="border px-4 py-2">
                    Rs. {registration.totalPrice}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(registration.registrationDate).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">{registration.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDownloadTicket(registration)}
                      className="font-semibold px-4 py-1 border rounded"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">Loading your details...</p>
      )}
    </div>
  );
};

export default DashboardUser;
