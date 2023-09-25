import { MantineProvider} from '@mantine/core';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Footer from "./components/dashbord/Footer/footer";
import React from "react";
import IndexPage from "./pages/IndexPage";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashbord";

import AddImage from "./pages/AddImage";
import DisplayImage from "./pages/DisplayImage";

import SubmitTicketPage from './pages/submitTicket/submitTicket';
import Chatbot from './components/support/chatBot/Chatbot';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS> 
    <Notifications position='top-center'/>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashbord" element={<Dashboard />} />

        <Route path="/contactUs" element={<ContactUs />} />
<Route path="/ticket/submit" element={<SubmitTicketPage/>} />
<Route path="/support/chatbot" element={<Chatbot/>} />
{/*<Route path="/support/mytickets" element={<MyTickets/>}/>

        <Route path="/home" element={<IndexPage />} />
        <Route path="/image-add" element={<AddImage />} />
        <Route path="/image-display" element={<DisplayImage />} />


        {/* <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/signin" element={<Screen />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Navigate to="/home" />} /> */}
      </Routes>
      <Footer />
    </div>
    </MantineProvider>
  );
}

export default App;
