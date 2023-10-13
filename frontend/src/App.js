import { MantineProvider } from "@mantine/core";
import {
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import Footer from "./components/dashbord/Footer/footer";
import IndexPage from "./pages/IndexPage";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import FeedbackView from "./pages/FeedbackView";

import ContactUs from "./pages/ContactUs";


import Dashboard from "./pages/Dashbord";
import Agent from "./components/dashbord/Agent";

//madushi
import SubmitTicketPage from "./pages/submitTicket/submitTicket";
import Chatbot from "./components/support/chatBot/Chatbot";
import { Notifications } from "@mantine/notifications";
import MyTicketPage from "./pages/MyTickets/myTickets";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import FeedbackEdit from "./pages/FeedbackEdit";
import FeedbackReport from "./pages/FeedbackReport";

function App() {
  const queryClient = new QueryClient();
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


            <Route path="/dashbord/agent" element={<Agent />} />

            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/ticket/submit" element={<SubmitTicketPage />} />
            <Route path="/support/chatbot" element={<Chatbot />} />
            <Route path="/ticket/mytickets" element={<MyTicketPage />} />

            <Route path="/feedbacks" element={<FeedbackView />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/feedback/edit/:id" element={<FeedbackEdit />} />
            <Route path="/feedback/report" element={<FeedbackReport />} />
          </Routes>
          <Footer />
        </div>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
