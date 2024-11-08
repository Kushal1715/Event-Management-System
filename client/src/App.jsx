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
import Payment from "./pages/Payment";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreateEvent from "./pages/CreateEvent";
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
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-event" element={<CreateEvent />} />
        </Route>
        <Route path="/events" element={<Events />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
};

export default App;
