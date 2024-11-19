import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";

const RegisterEvent = () => {
  const { eventSlug } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    ticketsBooked: 1,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    ticketsBooked: Yup.number()
      .min(1, "At least 1 ticket is required")
      .required("Number of tickets is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch(`/api/registration/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, userId: currentUser._id, eventSlug }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitting(false);

        navigate(`/confirmation/${data._id}`);
      } else {
        setSubmitting(false);
        setErrors({
          submit: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setSubmitting(false);
      setErrors({ submit: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-4xl font-bold mb-8">Register for Event</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full border rounded-md p-2 text-black"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full border rounded-md p-2 text-black"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm "
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">
                Phone Number
              </label>
              <Field
                type="text"
                id="phone"
                name="phone"
                className="w-full border rounded-md p-2 text-black"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm "
              />
            </div>

            <div>
              <label htmlFor="tickets" className="block mb-1 font-medium">
                Number of Tickets
              </label>
              <Field
                type="number"
                id="ticketsBooked"
                name="ticketsBooked"
                min="1"
                className="w-full border rounded-md p-2 text-black"
              />
              <ErrorMessage
                name="tickets"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {errors.submit && (
              <div className="text-red-500">{errors.submit}</div>
            )}

            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterEvent;
