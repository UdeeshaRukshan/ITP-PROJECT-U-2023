import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashbord";
import AdminDashboard from "./pages/AdminDashboard";
import Agent from "./pages/Agent";
import Payment from "./pages/Payment";
import Auction from "./pages/Auction";
import DashboardSupportContent from "./pages/supportAdminDashboard/supportPage";
import { MantineProvider } from '@mantine/core';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import CustomerSupport from "./pages/CustomerSupport";
import Report from "./pages/Report";
function App() {
  // Create a client
const queryClient = new QueryClient()
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/auction" element={<Auction/>}/>
        <Route path="/customersupport" element={<DashboardSupportContent/>}/>
        <Route path="/customer" element={<CustomerSupport/>}/>
        <Route path="/report" element={<Report/>}/>
      </Routes>
    </div>
    </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
