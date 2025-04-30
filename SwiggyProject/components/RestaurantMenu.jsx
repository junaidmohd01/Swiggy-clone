import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ShimmerEffect from '../ShimmerEffect'



function RestaurantMenu() {

   let params = useParams()
   const [restaurantMenuData ,setRestaurantMenuData] = useState([])
   
   useEffect( ()=> {
    axios.get(`
https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4434646&lng=78.3771953&restaurantId=${params.restId}&catalog_qa=undefined&submitAction=ENTER`)
.then((res)=>{
  setRestaurantMenuData(res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.splice(1))
})
}, [])
   
  return (
<div className='container'>
      <h2>{params.restName}'s Menu</h2>
      <div className="accordion" id="accordionPaneIsStayOpenExample">
      {restaurantMenuData.length == 0 ? <ShimmerEffect/> : ""}
        {restaurantMenuData.map( (item,i) => {
          if(item.card.card.itemCards){
            return <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen${i}`} aria-expanded="true" aria-controls={`panelsStayOpen${i}`}>
                  <b> {item.card.card.title} - {item.card.card.itemCards.length}</b>
                </button>
              </h2>
              <div id={`panelsStayOpen-collapse${i}`} className="accordion-collapse collapse show">
                <div className="accordion-body">
                <div class="row row-cols-1 row-cols-lg-5 mt-3 g-4">
            {item.card.card.itemCards.map( (item, i)=>{
              console.log(item)
              return <div class="col">
              <div class="card h-100">
                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.card.info.imageId}`} style={{width:"150px", height:"150px",borderRadius:"5px", backgroundColor:"orange"}}/>
                <div class="card-body">
                  <h5 class="card-title">{item?.card?.info?.name}</h5>
                  <p><b>{item?.card?.info?.price ? item?.card?.info?.price / 100 : item?.card?.info?.defaultPrice/100}</b></p>
                  <p><i class="bi bi-star-fill"></i> {item?.card?.info?.ratings?.aggregatedRating?.rating}</p>
                  <div>{item?.card?.info?.isVeg ? <span><div style={{width:"20px" , height:"20px", borderRadius:"10px", backgroundColor:"green"}}></div> Veg </span> : <span><div style={{width:"20px" , height:"20px", borderRadius:"10px", backgroundColor:"red"}}></div> Non - Veg</span>}</div>
                  <button type="button" class="btn btn-success">Add to Card</button>
                  
                </div>
              </div>
            </div>
            } )}
  

</div>
                </div>

              </div>
              </div>
          }
          
        })}
      </div>
      
</div>
  )
}

export default RestaurantMenu


  

