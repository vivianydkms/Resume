import React, { useState } from 'react'
import "./Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="logo">Get it Done</div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#">Home</a></li>
        <li><a href="">About</a></li>
        <li><a href="">Services</a></li>
      </ul>
    </nav>
  )
}

export default Navbar