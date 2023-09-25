// frontend/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ItemPage from "./components/ItemPage";
import WishlistPage from "./components/WishlistPage";

function App() {
  return (
    <Router>
      {/* <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Item Page</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist Page</Link>
            </li>
          </ul>
        </nav> */}

      {/* Define your routes */}
      <Route path="/" exact component={<ItemPage />} />
      <Route path="/wishlist" component={<WishlistPage />} />
      {/* </div> */}
    </Router>
  );
}

export default App;
