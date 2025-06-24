import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AdminDashboard() {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();

  const [stepOne, setStepOne] = useState({
    make: "",
    model: "",
    year: ""
  });

  const [specs, setSpecs] = useState({
    fuel_type: "",
    transmission: "",
    cylinders: "",
    displacement: "",
    drive: ""
  });

  const [formData, setFormData] = useState({
    license_plate: "",
    name: "",
    color: "",
    type: "subcompact",
    serial_number: "",
    pieces: "",
    price: "",
    status: "available",
    image_url: "",
    is_active: true,
    created_at: new Date().toISOString().slice(0, 16)
  });

  const handleStepOneChange = (e) => {
    setStepOne({ ...stepOne, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData({
    ...formData,
    [name]: 
      type === "checkbox"
      ? checked
      : (name === "price" || name === "pieces"
         ? parseInt(value) || 0
         : value)
  });
  };

  const fetchSpecs = async () => {
    const { make, model, year } = stepOne;
    if (!make || !model || !year) {
      alert("Please enter make, model, and year first");
      return;
    }

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/cars?make=${make}&model=${model}&year=${year}`,
        {
          headers: {
            "X-Api-Key": "f13gyTrNUEiB3rNzsFHuiA==zcBCgIdRpbLak0BG"
          }
        }
      );
      const data = await response.json();
      if (data.length === 0) {
        alert("No data found from external API.");
        return;
      }

      const car = data[0];
      setSpecs({
        fuel_type: car.fuel_type,
        transmission: car.transmission === "a" ? "automatic" : "manual",
        cylinders: car.cylinders,
        displacement: car.displacement,
        drive: car.drive
      });

      alert("Specs fetched successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch specs");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...stepOne,
      ...formData,
      ...specs
    };

    try {
      const res = await fetch(backendUrl+"/api/cars/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      let json;
      try {
        json = await res.json();
      } catch (err) {
        alert("Unexpected server response");
        return;
      }

      if (res.ok) {
        alert("Car successfully added");
        navigate("/");
      } else {
        alert(json.msg || "Error occurred while adding car");
      }
    } catch (err) {
      console.error(err);
      alert("Request failed");
    }
  };

  return (
    <div className="container my-5">
      <h2>Admin Dashboard – Add Car</h2>

      <div className="card p-3 mb-4">
        <h4>Step 1 – Fetch Car Specs</h4>
        <div className="row g-3">
          {["make", "model", "year"].map((field) => (
            <div className="col-md-4" key={field}>
              <label className="form-label">{field.toUpperCase()}</label>
              <input
                type={field === "year" ? "number" : "text"}
                className="form-control"
                name={field}
                value={stepOne[field]}
                onChange={handleStepOneChange}
                required
              />
            </div>
          ))}
        </div>
        <button
          className="btn btn-secondary mt-3"
          type="button"
          onClick={fetchSpecs}
        >
          Fetch Car Specs
        </button>

        {specs.fuel_type && (
          <div className="mt-4">
            <h5>Fetched Specs:</h5>
            <ul>
              {Object.entries(specs).map(([key, val]) => (
                <li key={key}>
                  <strong>{key.replace("_", " ")}:</strong> {val}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form className="card p-3" onSubmit={handleSubmit}>
        <h4>Step 2 – Admin Info</h4>

        {[
          { name: "license_plate", label: "License Plate" },
          { name: "name", label: "Name" },
          { name: "color", label: "Color" },
          { name: "serial_number", label: "Serial Number" },
          { name: "pieces", label: "Number of Pieces", type: "number" },
          { name: "price", label: "Price (USD)", type: "number" },
          { name: "image_url", label: "Image URL", type: "url" }
        ].map(({ name, label, type }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type || "text"}
              className="form-control"
              name={name}
              value={formData[name]}
              onChange={handleFormChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleFormChange}
          >
            <option value="subcompact">Subcompact</option>
            <option value="medium">Medium</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleFormChange}
          >
            <option value="available">Available</option>
            <option value="rent">Rented</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Created At</label>
          <input
            type="datetime-local"
            name="created_at"
            className="form-control"
            value={formData.created_at}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleFormChange}
            id="isActive"
          />
          <label className="form-check-label" htmlFor="isActive">
            Is Active
          </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Save Car to Inventory
        </button>
      </form>
    </div>
  );
}