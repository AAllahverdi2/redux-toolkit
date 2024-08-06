import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
const Header = () => {
  return (
    <div className='header__all'>
        <Link to="/">Home</Link>
        <Link to="/Basket">Basket</Link>
        <Link to="/Fav">Favorites</Link>
        <Link to="/Add">Add</Link>
      
    </div>
  )
}

export default Header
