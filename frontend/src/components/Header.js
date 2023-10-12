 import React from "react";


 function Header() {

   return(
    
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">AuctionPal</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/getauctioneers">Users</a>        
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/getvehicles">Vehicles</a>        
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/getarts">Arts</a>        
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/getproperties">Properties</a> 
          </li>
          <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/getcollectables">Collectables</a>        
        </li>       
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Forms
          </a>
          <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="/add">PersonalDetails</a></li>
            <li><a className="dropdown-item" href="/addvehicle">Vehicles</a></li>
            <li><a className="dropdown-item" href="/addproperty">Properties</a></li>
            <li><a className="dropdown-item" href="/addcollectable">Collectables</a></li>        
            <li><a className="dropdown-item" href="/addart">Arts</a></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div> 
</nav>
   )
 }

 export default Header;
  


