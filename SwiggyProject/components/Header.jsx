import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <>
    <div>
      <div id="header">
        <Link to="/"><img
          style={{ width: "300px" }}
          src={`https://upload.wikimedia.org/wikipedia/commons/f/f4/Swiggy_Text_Logo.png`}
        /></Link>
        <Link to="/searchRestaurants"><p>Search Restaurants</p></Link>
        <Link to="/searchDishes"><p>Search Dishes</p> </Link>
        <p>Cart</p>
      </div>
    </div>
    </>
  )
}

export default Header
