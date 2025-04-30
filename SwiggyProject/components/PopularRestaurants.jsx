import React, { useEffect, useState } from 'react'
import ShimmerEffect from '../ShimmerEffect';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PopularSearch from './PopularSearch';


function PopularRestaurants({popularRestaurants}) {
  
  const [userSearch, setUserSearch] = useState([])
  const [searchMenu, setSearchMenu] = useState([])


  useEffect(()=>{
    axios.get(`

https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.4434646&lng=78.3771953&str=${userSearch}&trackingId=null&includeIMItem=true`)
.then((res)=>{
  // console.log(res.data.data.suggestions)
  setSearchMenu(res.data.data)
 
})

  }, [userSearch])

  return  (
    <>
      <div className="col-10">
          <div style={{ textAlign: "center" }}>
            <h1> Popular Restaurants in Hyderabad</h1>
           <PopularSearch searchMenu ={ searchMenu} setSearchMenu = { setSearchMenu}
           userSearch = {userSearch} setUserSearch ={setUserSearch} />
          </div>
          <div className="container mt-4 ">
            <div class="row row-cols-1 row-cols-md-3 mt-3 row-cols-lg-4 g-4">
              {popularRestaurants.length == 0 ? <ShimmerEffect /> : ""}
              {<PopularSearch /> == 0 ? popularRestaurants.map((item, i) => {
                 
                return (           <div class="card border-0">
                  <Link to={`/restaurantMenu/${item.info.name}/${item.info.id}`}>   <div class="col" >
                      <div class="card h-100">
                        <img
                          className="restaurant-thumbnail"
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                        />
                        <div class="card-body">
                          <h5 class="card-title">{item.info.name}</h5>
                          <p>
                            <i
                              class={`bi bi-star-fill ${
                                item?.info?.avgRating >= 4.5
                                  ? "top-rated-restaurant"
                                  : item?.info?.avgRating < 4
                                  ? "poor-rated-restaurant"
                                  : "avg-rated-restaurant"
                              }`}
                            ></i>{" "}
                            {item?.info?.avgRating
                              ? item?.info?.avgRating
                              : item?.info?.avgRatinString}{" "}
                            * <b>{item?.info?.sla?.slaString}</b>
                          </p>
                          <p>{item?.info?.areaName}</p>
                          <p>{item?.info?.cuisines.slice(0, 4).join(", ")}</p>
                        </div>
                      </div>
                    </div></Link>
                  </div>
                );
              
              }) : popularRestaurants.map((item, i) => {
                 
                return (  <div class="card border-0">
                  <Link to={`/restaurantMenu/${item.info.name}/${item.info.id}`}>   <div class="col" >
                      <div class="card h-100">
                        <img
                          className="restaurant-thumbnail"
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                        />
                        <div class="card-body">
                          <h5 class="card-title">{item.info.name}</h5>
                          <p>
                            <i
                              class={`bi bi-star-fill ${
                                item?.info?.avgRating >= 4.5
                                  ? "top-rated-restaurant"
                                  : item?.info?.avgRating < 4
                                  ? "poor-rated-restaurant"
                                  : "avg-rated-restaurant"
                              }`}
                            ></i>{" "}
                            {item?.info?.avgRating
                              ? item?.info?.avgRating
                              : item?.info?.avgRatinString}{" "}
                            * <b>{item?.info?.sla?.slaString}</b>
                          </p>
                          <p>{item?.info?.areaName}</p>
                          <p>{item?.info?.cuisines.slice(0, 4).join(", ")}</p>
                        </div>
                      </div>
                    </div></Link>
                  </div>
                );
              
              }) }
            </div> 
          </div>
        </div> 
    </>
  )
}

export default PopularRestaurants
