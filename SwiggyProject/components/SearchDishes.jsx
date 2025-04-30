import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShimmerEffect from '../ShimmerEffect'


function SearchDishes() {

    const [ dishesName, setDishesName] = useState("")
    const [ moreDishes, setMoreDishes] = useState([])

useEffect( () => {
    axios.get(`

https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.4434646&lng=78.3771953&str=${dishesName}&trackingId=null&includeIMItem=true
`)
.then( (res)=>{
    
    setMoreDishes(res.data.data.suggestions)
})
}, [dishesName])



  return (
<div style={{textAlign:"center"}}>
<h1>Search your Favourite Dishes</h1>
<input placeholder='Search Dishes'
value={dishesName} onChange={(e)=>{
    setDishesName(e.target.value)
}}   />
<div className='container'>
<div class="row row-cols-1 row-cols-md-4 mt-2 lg-5 g-4">
{moreDishes.length == 0 ? <ShimmerEffect /> : ""}
{moreDishes.map( (item,i)=> {
    console.log(item, "its maping ")
    return <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.cloudinaryId}`} style={{width:"272px", height:"150px",borderRadius:"5px", backgroundColor:"orange"}}/>
      <div class="card-body">
        <h5 class="card-title">{item.text}</h5>
        <p class="card-text">{}</p>
      </div>
    </div>
  </div>
   })}
   </div>
   </div>

</div>
  )
}

export default SearchDishes
