import React from 'react'
import "./Navbar.css"


const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="logo font-bold">
      Get it Done
    </div>
    <ul className="nav-links">
      <li className="transition-all duration-[0.01s] hover:scale-110">
        <a href="#">Home</a>
      </li>
      <li className="transition-all duration-[0.01s] hover:scale-110">
        <a href="">About</a>
      </li>
      <li className="transition-all duration-[0.01s] hover:scale-110">
        <a href="">Services</a>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar
