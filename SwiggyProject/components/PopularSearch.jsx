import axios from 'axios'
import React, { useEffect, useState } from 'react'


function PopularSearch({setUserSearch,userSearch}) {
    const [searchingMenu, setSearchingMenu] = useState([])

    useEffect( () => {
        axios.get(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.4434646&lng=78.3771953&str=${userSearch}&trackingId=null&includeIMItem=true`)
        .then( (Res) => {
            setSearchingMenu(Res.data.data.suggestions)
        })
    }, [userSearch])

  return (
    <div>
       <input 
            value={userSearch}
            onChange={(e)=>{
              setUserSearch(e.target.value)
            }}
            placeholder="Search popular restaurants" />
            <div class="row row-cols-1 row-cols-md-3 mt-3 row-cols-lg-4 g-4">
            {searchingMenu.map( (item,i) => {
                console.log(item)
                return <div class="col">
                <div class="card h-100" style={{backgroundColor:"black", color:"whitesmoke"}}>
                  <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.cloudinaryId}`} style={{width:"223px",height:"150px", borderRadius:"5px"}} />
                  <div class="card-body">
                    <h5 class="card-title">{item.text}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
            })}
            
  
  
</div>

    </div>
  )
}

export default PopularSearch
