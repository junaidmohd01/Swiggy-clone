import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "../SwiggyProject/components/Header";
import RestaurantMenu from "./components/RestaurantMenu";
import SearchDishes from "./components/SearchDishes";
import SearchRestaurants from "./SearchRestaurants";



function App() {
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  let [locationName, setLocationName] = useState("")
  const [locations,setLocations] = useState([])
  let [coordinates, setCoordinates] = useState({lat:"17.37240", lng:"78.43780"})
  

  useEffect(()=>{
    axios.get(`
  https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
  .then( (res)=>{
    setPopularRestaurants(res.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
})
  },[coordinates]);
  useEffect( ()=>{
    axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationName}&types=`)
    .then((res)=>{
      if(res.data.data){
      setLocations(res.data.data)
      }
    })
  }, [locationName])
 
 
  
  
 

  return (
    <>
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home popularRestaurants ={popularRestaurants}
      setPopularRestaurants ={setPopularRestaurants}
      locationName ={locationName} setLocationName={setLocationName}
      locations={locations} setLocations={setLocations}
      setCoordinates={setCoordinates} />}/>
      <Route path='/restaurantMenu/:restName/:restId'
      element = {<RestaurantMenu/>}/>
      <Route path='/searchRestaurants' element={<SearchRestaurants/>}/>
      <Route path='/searchDishes' element = {<SearchDishes/>} />
    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
