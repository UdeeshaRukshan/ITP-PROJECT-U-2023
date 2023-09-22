import './App.css';
import React from 'react';
import CounterClass from './components/CounterClass';
import CounterFunction from './components/CounterFunction';
import Header from './components/Header';
import PersonalDetails from  './components/PersonalDetails';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import VehicleDetails from './components/VehicleDetails';

function App() {
  return (
   <Router>
    <div>
     <Header/>
     <Routes>
     <Route path="/add" element={<PersonalDetails/>}/>
     <Route path="/addvehicle" element={<VehicleDetails />} />
     </Routes>     
    </div>
   </Router>
  
  );
}

export default App;
