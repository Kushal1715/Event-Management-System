import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Header from "./components/Header";
import FooterCom from "./components/FooterCom";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreateEvent from "./pages/CreateEvent";
import UpdateEvent from "./pages/UpdateEvent";
import EventDetails from "./pages/EventDetails";
import Search from "./pages/Search";
import RegisterEvent from "./pages/RegisterEvent";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import ConfirmationPage from "./pages/ConfirmationPage";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/register-event/:eventSlug"
            element={<RegisterEvent />}
          />
          <Route
            path="/confirmation/:registrationId"
            element={<ConfirmationPage />}
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/update-event/:eventId" element={<UpdateEvent />} />
        </Route>
        <Route path="/events" element={<Events />} />
        <Route path="/event-details/:eventSlug" element={<EventDetails />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
};

export default App;
