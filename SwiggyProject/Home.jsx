import React from "react";
import ShimmerEffect from "./ShimmerEffect";
import axios from "axios";
import Location from "./components/Location";
import PopularRestaurants from "./components/PopularRestaurants";

function Home({
  popularRestaurants,
  setPopularRestaurants,
  locationName,
  setLocationName,
  locations,
  setCoordinates,
}) {
  const getCoordiNates = (placeid) => {
    axios
      .get(
        `
https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeid}`
      )
      .then((res) => {
        setCoordinates(res?.data?.data[0]?.geometry?.location);
      });
  };

  return (
    <>
     

      <div className="row">
        <Location
          setLocationName={setLocationName}
          locationName={locationName}
          setPopularRestaurants={setPopularRestaurants}
          getCoordiNates={getCoordiNates}
          locations={locations}
        />
       <PopularRestaurants popularRestaurants={popularRestaurants}/>
      </div>
    </>
  );
}

export default Home;
