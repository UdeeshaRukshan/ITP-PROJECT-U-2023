import { MantineProvider } from "@mantine/core";
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

import Checkout from "./pages/Checkout";

import SubmitTicketPage from "./pages/submitTicket/submitTicket";
import Chatbot from "./components/support/chatBot/Chatbot";
import { Notifications } from "@mantine/notifications";
import MyTicketPage from "./pages/MyTickets/myTickets";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications position="top-center" />
      <QueryClientProvider client={queryClient}> 
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashbord" element={<Dashboard />} />
          <Route path="/home" element={<IndexPage />} />
          <Route path="/payment" element={<Checkout />} />

          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/ticket/submit" element={<SubmitTicketPage />} />
          <Route path="/support/chatbot" element={<Chatbot />} />
          <Route path="/ticket/mytickets" element= {<MyTicketPage/>}/>
        </Routes>
        <Footer />
      </div>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
