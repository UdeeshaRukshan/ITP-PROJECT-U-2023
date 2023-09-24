import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ArtForm from "./components/ArtForm";
import VehiclesForm from "./components/VehiclesForm";
import CollectableForm from "./components/CollectableForm";
import PropertiesForm from "./components/PropertiesForm";

function App() {
  return (
    <div>
      <Header/>
       <PersonalDetails/>   
        <Router>
         <Routes>
          {/* Define your routes */}
           <Route path="/addart" element={<ArtForm />} />      
           <Route path="/addvehicle" element={<VehiclesForm />} />
           <Route path="/addcollectable" element={<CollectableForm />} />
           <Route path="/addproperty" element={<PropertiesForm />} />


          {/* Add other routes if needed */}
         </Routes>
        </Router>
    </div>
  );
}

export default App;
