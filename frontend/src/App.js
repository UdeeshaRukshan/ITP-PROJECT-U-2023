import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ArtForm from "./components/ArtForm";
import VehiclesForm from "./components/VehiclesForm";
import CollectableForm from "./components/CollectableForm";
import PropertiesForm from "./components/PropertiesForm";
import AllAuctioneers  from "./components/AllAuctioneers";

function App() {
  return (
    <div>
      <Header/>    
         
        <Router>
         <Routes>
          
           <Route path="/" exact element={<AllAuctioneers/>} />
           <Route path="/add" exact element={<PersonalDetails />} /> 
           <Route path="/addart" exact element={<ArtForm />} />      
           <Route path="/addvehicle" exact element={<VehiclesForm />} />
           <Route path="/addcollectable" exact element={<CollectableForm />} />
           <Route path="/addproperty" exact element={<PropertiesForm />} />


          {/* Add other routes if needed */}
         </Routes>
        </Router>
    </div>
  );
}

export default App;
