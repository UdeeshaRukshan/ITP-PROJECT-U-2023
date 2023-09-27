import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ArtForm from "./components/ArtForm";
import VehiclesForm from "./components/VehiclesForm";
import CollectableForm from "./components/CollectableForm";
import PropertiesForm from "./components/PropertiesForm";
import AllAuctioneers  from "./components/AllAuctioneers";
import AllArts from "./components/AllArts";
import AllProperties from "./components/AllProperties";
import AllCollectables from "./components/AllCollectables";
import AllVehicles from "./components/AllVehicles";


function App() {
  return (
    <div>
      <Header/>    
         
        <Router>
         <Routes>
          
           <Route path="/add" exact element={<PersonalDetails />} /> 
           <Route path="/addart" exact element={<ArtForm />} />      
           <Route path="/addvehicle" exact element={<VehiclesForm />} />
           <Route path="/addcollectable" exact element={<CollectableForm />} />
           <Route path="/addproperty" exact element={<PropertiesForm />} />
           <Route path="/getauctioneers" exact element={<AllAuctioneers/>} />
           <Route path="/getarts" exact element={<AllArts/>} />
           <Route path="/getproperties" exact element={<AllProperties/>} />
           <Route path="/getcollectables" exact element={<AllCollectables/>} />
           <Route path="/getvehicles" exact element={<AllVehicles/>} />
           
 



          {/* Add other routes if needed */}
         </Routes>
        </Router>
    </div>
  );
}

export default App;
