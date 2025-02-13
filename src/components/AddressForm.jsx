import "../styles/AddressForm.scss";
import AutoCompleteInput from "./AutoCompleteInput";
import PropTypes from "prop-types";
import getLocationbyLatLng from "../Api/getLocationByLatLng.js";
import { useEffect, useState } from "react";

AddressForm.propTypes = {
  address: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};

export default function AddressForm({ address, onSubmit, setAddress }) {
  const TOKEN = 'pk.eyJ1IjoicGhhbmR1eSIsImEiOiJjbGswaDQzNjgwbGJlM2Z0NXd2c2V0eTgxIn0.mu5cOmm7meqqmT7eicLbKA';

  const tmpLongitude = address.longitude;
  const tmplatitude = address.latitude;
  const [longitude, setLongitude] = useState(tmpLongitude);
  const [latitude, setLatitude] = useState(tmplatitude);

  useEffect(() => {
    setLongitude(tmpLongitude);
    setLatitude(tmplatitude);
  })

  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };

  const handleLatInputChange = (event) => {
    if (event.target.value) {
      setLatitude(event.target.value);
    }
  }

  const handleLngInputChange = (event) => {
    if (event.target.value) {
      setLongitude(event.target.value);
    }
  }

  const handleLatLngSubmit = async (event) => {
    const response = await getLocationbyLatLng(longitude, latitude, TOKEN);
    const lng = response[0].center[0];
    const lat = response[0].center[1];
    const addressName = response[0].place_name;

    setAddress({
      streetAndNumber: addressName,
      longitude: lng,
      latitude: lat
    })
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <AutoCompleteInput
          setAddress={setAddress}
          handleManualInputChange={handleManualInputChange}
          streetAndNumber={address.streetAndNumber}
        />

        {/* <div className="buttons">
        <button type="submit" className="confirm-button">
          Confirm
        </button>
        <button
          type="reset"
          className="reset-button"
          onClick={() =>
            setAddress({
              streetAndNumber: "",
              place: "",
              region: "",
              postcode: "",
              country: "",
              latitude: "",
              longitude: "",
            })
          }
        >
          Reset
        </button>
      </div> */}
      </form>

      <div className="lonlat-container">
        <label>Latitude: </label>
        <input type="text" id="lat" value={latitude} onChange={handleLatInputChange}/>
        <label style={{ marginLeft: "20px" }}>Longitude: </label>
        <input type="text" id="long" value={longitude} onChange={handleLngInputChange}/>
        <button className="confirm-button" onClick={handleLatLngSubmit}>Find</button>
      </div>
    </div>
  );
}