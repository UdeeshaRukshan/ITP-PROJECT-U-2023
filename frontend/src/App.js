import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ArtForm from "./components/ArtForm";
import VehiclesForm from "./components/VehiclesForm";
import CollectableForm from "./components/CollectableForm";
import PropertiesForm from "./components/PropertiesForm";

import AllArtsUpdate from "./components/categoriesUpdate/AllArtsUpdate";
import AllPropertiesUpdate from "./components/categoriesUpdate/AllPropertiesUpdate";
import AllCollectablesUpdate from "./components/categoriesUpdate/AllCollectablesUpdate";
import AllVehiclesUpdate from "./components/categoriesUpdate/AllVehiclesUpdate";
import EditArtForm from "./components/EditArtForm";
import EditCollectableForm from "./components/EditCollectableForm";

function App() {
  return (
    <div>
      <Header />

      <Router>
        <Routes>
          <Route path="/add" exact element={<PersonalDetails />} />
          <Route path="/addart" exact element={<ArtForm />} />
          <Route path="/addvehicle" exact element={<VehiclesForm />} />
          <Route path="/addcollectable" exact element={<CollectableForm />} />
          <Route path="/addproperty" exact element={<PropertiesForm />} />

          <Route path="/getarts" exact element={<AllArtsUpdate />} />
          <Route
            path="/getproperties"
            exact
            element={<AllPropertiesUpdate />}
          />
          <Route
            path="/getcollectables"
            exact
            element={<AllCollectablesUpdate />}
          />
          <Route path="/getvehicles" exact element={<AllVehiclesUpdate />} />
          <Route path="/updateart/:artid" exact element={<EditArtForm />} />
          <Route
            path="/updatecollectable/:collectableid"
            exact
            element={<EditCollectableForm />}
          />

          {/* Add other routes if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
