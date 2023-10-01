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

//nuwani
import PersonalDetails from "./components/category/PersonalDetails";
import ArtForm from "./components/category/ArtForm";
import VehiclesForm from "./components/category/VehiclesForm";
import CollectableForm from "./components/category/CollectableForm";
import PropertiesForm from "./components/category/PropertiesForm";
import AllAuctioneers from "./components/category/AllAuctioneers";
import AllArts from "./components/category/AllArts";
import AllProperties from "./components/category/AllProperties";
import AllCollectables from "./components/category/AllCollectables";
import CollectableDetails from "./components/itempage/CollectableDetail";
import AllVehicles from "./components/category/AllVehicles";
import PropertyDetails from "./components/itempage/PropertieDetails";
import ArtDetails from "./components/itempage/ArtDetails";
import Wishlist from "./pages/wishlist";
import Payment from "./pages/Payment";
import supportQuesPage from "./pages/Support Ques/supportQues";
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
            <Route path="/support/supportQues" element={<supportQuesPage />} />


            <Route path="/add" exact element={<PersonalDetails />} />
            <Route path="/addart" exact element={<ArtForm />} />
            <Route path="/addvehicle" exact element={<VehiclesForm />} />
            <Route path="/addcollectable" exact element={<CollectableForm />} />
            <Route path="/addproperty" exact element={<PropertiesForm />} />
            <Route path="/getauctioneers" exact element={<AllAuctioneers />} />
            <Route path="/arts" exact element={<AllArts />} />
            <Route path="/properties" exact element={<AllProperties />} />
            <Route path="/collectables" exact element={<AllCollectables />} />
            <Route path="/vehicle" exact element={<AllVehicles />} />


            <Route path="/dashbordpayment" exact element={<Payment />} />
            <Route
              path="/collectables/:auctioneerId"
              element={CollectableDetails}
            />
            <Route path="/property/:propertyId" element={<PropertyDetails />} />

            <Route path="/arts/:artid" element={<ArtDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>

          <Footer />
        </div>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
