import React, { useState } from "react";
import axios from "axios";
import "./VehicleForm.css";
import { Link } from "react-router-dom";

function VehicleForm() {
  const fileInput = React.useRef();

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [mileage, setMileage] = useState("");
  const [features, setFeatures] = useState("");
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");
  const [image, setImage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  function sendData(e) {
    e.preventDefault();

    if (!image) {
      alert("Please select image.");
      return;
    }

    function formatDateTime(date) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }

    function getCurrentTimeInSriLanka() {
      const currentTimeInSriLanka = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Colombo",
      });
      return new Date(currentTimeInSriLanka);
    }

    const currentSriLankaTime = getCurrentTimeInSriLanka();
    setStartTime(formatDateTime(currentSriLankaTime));

    const endTimeInSriLanka = new Date(currentSriLankaTime);
    endTimeInSriLanka.setHours(endTimeInSriLanka.getHours() + 24);
    setEndTime(formatDateTime(endTimeInSriLanka));

    console.log(startTime);
    console.log(endTime);

    axios
      .post("http://localhost:4042/vehicle/addvehicle", {
        vehicleNumber,
        year,
        model,
        fuelType,
        mileage,
        features,
        location,
        value,
        image,
        startTime,
        endTime,
      })
      .then(() => {
        alert("Your Vehicle Added ");
        setVehicleNumber("");
        setYear("");
        setModel("");
        setFuelType("");
        setMileage("");
        setFeatures("");
        setLocation("");
        setValue("");
        setImage(null);
        setStartTime(null);
        setEndTime(null);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const postDetails = (pic) => {
    if (pic === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (pic.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", pic);
      const uploadPreset = "notificationimg";
      const cloudName = "drmwn5axe";
      const cloudinaryUploadURL =
        "https://api.cloudinary.com/v1_1/drmwn5axe/image/upload";

      data.append("upload_preset", uploadPreset);

      data.append("cloud_name", cloudName);

      fetch(cloudinaryUploadURL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          //const imageUrl = data.url.toString();
          setImage(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Plese upload an image!!!");
    }
  };

  return (
    <div className="vehicle-form-container">
      <form onSubmit={sendData}>
        <h2 className="vehicle-form-title">Tell Us About Your Vehicle</h2>

        <label className="vehicle-form-label" htmlFor="title">
          Vehicle Number:
        </label>
        <input
          type="text"
          id="vehicleNumber"
          className="vehicle-form-input"
          placeholder="e.g., ABC-2056"
          required
          onChange={(e) => {
            setVehicleNumber(e.target.value);
          }}
        />
        <br></br>

        <div className="row">
          <div className="col">
            <label className="vehicle-form-label" htmlFor="model">
              {" "}
              Vehicle Model:
            </label>
            <input
              type="text"
              id="model"
              className="vehicle-form-input"
              placeholder="e.g., Honda Civic"
              required
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
            <br></br>
          </div>
          <div className="col">
            <label className="vehicle-form-label" htmlFor="year">
              Manufacture Year:
            </label>
            <input
              type="number"
              id="year"
              className="vehicle-form-input"
              min="1900" // Set the minimum year to allow
              max="2099" // Set the maximum year to allow
              step="1" // Set the step to 1 to allow whole numbers only
              placeholder="e.g., 2000"
              required
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
            <br></br>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="vehicle-form-label" htmlFor="fuelType">
              Fuel Type:
            </label>
            <select
              className="vehicle-form-select"
              aria-label="Default select example"
              required
              onChange={(e) => {
                setFuelType(e.target.value);
              }}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="col">
            <label className="vehicle-form-label" htmlFor="mileage">
              Mileage:(In killometers)
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              className="vehicle-form-input"
              placeholder="e.g., 3200"
              required
              onChange={(e) => {
                const inputMileage = e.target.value;
                if (inputMileage > 0) {
                  setMileage(inputMileage);
                } else {
                  alert("Must enter valid value");
                }
              }}
            />
          </div>
        </div>

        <label className="vehicle-form-label" htmlFor="title">
          Features:
        </label>
        <textarea
          id="features"
          className="vehicle-form-textarea"
          placeholder="Mention the condition of your vehicle. "
          required
          onChange={(e) => {
            setFeatures(e.target.value);
          }}
        ></textarea>
        <br></br>

        <label className="vehicle-form-label" htmlFor="location">
          Where is this vehicle located:
        </label>
        <select
          className="vehicle-form-select"
          id="location"
          required
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        >
          <option value="">Select Location</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kaduwela">Kaduwela</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Anuradhapura">Anuradhapura</option>
        </select>
        <br />

        <label className="vehicle-form-label" htmlFor="openingValue">
          Set a opening value to auction your vehicle:($)
        </label>
        <input
          type="number"
          id="openingValue"
          className="vehicle-form-input"
          placeholder="e.g., 6000"
          required
          onChange={(e) => {
            const inputOpeningValue = e.target.value;
            if (inputOpeningValue > 0) {
              setValue(inputOpeningValue);
            } else {
              alert("Must enter valid value");
            }
          }}
        />
        <br />

        <label className="vehicle-form-label" htmlFor="image">
          Images:(Please add at least 6 photos of the interior and exterior of
          the vehicle)
        </label>

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        <br></br>

       <Link to={"/vehicle"}> <button type="submit" className="vehicle-form-button">
          Submit
        </button>
        </Link>
      </form>
    </div>
  );
}

export default VehicleForm;
