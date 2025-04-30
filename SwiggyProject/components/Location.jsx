import React from 'react'

function Location({setLocationName,locationName,setPopularRestaurants,getCoordiNates,locations}) {
  return (
    <>
    <div className="col-2 p-4">
  <h2>Location</h2>
  <input
  onChange={(e)=>{
    setLocationName(e.target.value)
  }}
  value={locationName} />
  {locationName !="" ?<ol>
    {locations.map( (item, i)=> {
     return <li onClick={()=>{
      setPopularRestaurants([])
      getCoordiNates(`${item.place_id}`)
     }}>{item.description}</li> 
    })}
  </ol> : ""}

  </div>
    </>
  )
}

export default Location
