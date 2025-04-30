import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShimmerEffect from './ShimmerEffect'


function SearchRestaurants() {

  let [RestaurantName, setRestaurantName] = useState("")
  let [moreRestaurants, setMoreRestaurants] = useState([])


  useEffect( () => {
    axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4434646&lng=78.3771953&str=${RestaurantName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=26718d5b-f681-6496-4e61-8ced8fdad5b5`)
    .then( (Res) => {
      if(Res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT){
        if(Res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards.length ==2){      
       setMoreRestaurants(Res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card.card.restaurant)
        }else{
          setMoreRestaurants(Res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)

        }
      }
    })

  }, [RestaurantName])


  return (
    <div style={{textAlign:"center"}}>
      <h1>Search your Favourite Restaurants</h1>
      <input 
      value={RestaurantName}
      placeholder='Search Restaurant'
      onChange={(e)=>{
        setRestaurantName(e.target.value)
      }}/>
      <div className="container mt-4 ">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      {moreRestaurants.length == 0 ? <ShimmerEffect /> : ""}
      {moreRestaurants.map( (item, i) => {
        console.log(item)
        return <div class="col">
        <div class="card h-100" style={{backgroundColor:"black",color:"grey"}}>
          <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.card.card.info.cloudinaryImageId}`} style={{width:"215px",height:"150px",borderRadius:"5px"}}/>
          <div class="card-body">
            <h5 class="card-title">{item?.card?.card?.info?.name}</h5>
            <p class="card-text"><i class="bi bi-star-fill"> {item?.card?.card?.info?.avgRating ? item?.card?.card?.info?.avgRating : item?.card?.card?.info?.avgRatingString } {" "}</i></p>
            <p>{item?.card?.card?.info?.costForTwo/100}</p>
            <span>{item?.card?.card?.info?.sla?.slaString}</span>
          </div>
        </div>
      </div>
      })}



      </div>
      </div>
    </div>
  )
}

export default SearchRestaurants
