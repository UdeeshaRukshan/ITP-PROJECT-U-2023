<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
=======
import './App.css';
import React from 'react';
import CounterClass from './components/CounterClass';
import CounterFunction from './components/CounterFunction';
import Header from './components/Header';
import PersonalDetails from  './components/PersonalDetails';
import VehicleDetails from './components/VehicleDetails';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

>>>>>>> a5d92b3be39d487aea93ac5d11ca1af1ef1cb4bc

import CounterClass from "./components/CounterClass";
import CounterFunction from "./components/CounterFunction";
import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ArtForm from "./components/ArtForm";
import VehicleForm from "./components/VehiclesForm";
import CollectableForm from "./components/CollectableForm";
function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Header />
      <Routes>
        {/* Define your routes */}
        <Route path="/artform" element={<ArtForm />} />
        <Route path="/personaldetails" element={<PersonalDetails />} />
        <Route path="/vehicle" element={<VehicleForm />} />
        <Route path="/collectable" element={<CollectableForm />} />

        {/* Add other routes if needed */}
      </Routes>
    </Router>
=======
   <Router>
    <div>
     <Header/>
     <Routes>
     <Route path="/add" element={<PersonalDetails/>}/>
     <Route path="/addvehicle" element={<VehicleDetails />} />
     </Routes>     
    </div>
   </Router>
  
>>>>>>> a5d92b3be39d487aea93ac5d11ca1af1ef1cb4bc
  );
}

export default App;
