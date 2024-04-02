import "./App.scss";
import AddressForm from "./components/AddressForm";
import CustomMap from "./components/Map";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import getLocations from "./Api/getLocations";

function App() {
  const TOKEN = 'pk.eyJ1IjoicGhhbmR1eSIsImEiOiJjbGswaDQzNjgwbGJlM2Z0NXd2c2V0eTgxIn0.mu5cOmm7meqqmT7eicLbKA';

  const [address, setAddress] = useState({
    streetAndNumber: "",
    latitude: 10.842033810975172,
    longitude: 106.80996883068278,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
      const result = await getLocations(address.streetAndNumber, TOKEN);
      updateCoordinates(result[0].center[1], result[0].center[0]);
    }
  };

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  return (
    <div className="App">
      <AddressForm
        onSubmit={handleFormSubmit}
        address={address}
        setAddress={setAddress}
      />
      {address.longitude && address.latitude && (
        <CustomMap
          longitude={address.longitude}
          latitude={address.latitude}
          updateCoordinates={updateCoordinates}
        />
      )}
    </div>
  );
}

export default App;