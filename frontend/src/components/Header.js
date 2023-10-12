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
          <a className="nav-link active" aria-current="page" href="/add">Users</a>        
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/addvehicle">Vehicles</a>        
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/addart">Arts</a>        
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/addproperty">Properties</a> 
          </li>
          <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/addcollectable">Collectables</a>        
        </li>       
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Forms
          </a>
          <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="/getauctioneers">PersonalDetails</a></li>
            <li><a className="dropdown-item" href="/getvehicles">Vehicles</a></li>
            <li><a className="dropdown-item" href="/getproperties">Properties</a></li>
            <li><a className="dropdown-item" href="/getcollectables">Collectables</a></li>        
            <li><a className="dropdown-item" href="/getarts">Arts</a></li>
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
  


