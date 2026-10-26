"use client";
import React, { useState } from "react";
import "./AddHostel.css";

const AddHostel = () => {
  const [formData, setFormData] = useState({
    hostelName: "",
    hostelType: "Boys",
    address: "",
    city: "",
    contactNumber: "",
    totalRooms: "",
    availableRooms: "",
    roomCapacity: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      Number(formData.availableRooms) >
      Number(formData.totalRooms)
    ) {
      setMessage(
        "Available rooms cannot exceed total rooms."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/hostel/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            totalRooms: Number(formData.totalRooms),
            availableRooms: Number(formData.availableRooms),
            roomCapacity: Number(formData.roomCapacity),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add hostel");
      }

      setMessage("Hostel added successfully!");

      setFormData({
        hostelName: "",
        hostelType: "Boys",
        address: "",
        city: "",
        contactNumber: "",
        totalRooms: "",
        availableRooms: "",
        roomCapacity: "",
      });
    } catch (error) {
      setMessage(
        error.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-hostel-page">
      <div className="hostel-form-card">
        <div className="hostel-form-header">
          <div className="hostel-icon">🏢</div>
          <h1>Add New Hostel</h1>
          <p>
            Enter hostel details to make it available
            for students.
          </p>
        </div>

        {message && (
          <div
            className={`hostel-message ${
              message.includes("successfully")
                ? "success"
                : "error"
            }`}
            role="status"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="hostel-form-grid">
            <div className="hostel-field">
              <label htmlFor="hostelName">Hostel Name *</label>
              <input
                id="hostelName"
                type="text"
                name="hostelName"
                placeholder="Enter hostel name"
                value={formData.hostelName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="hostel-field">
              <label htmlFor="hostelType">Hostel Type *</label>
              <select
                id="hostelType"
                name="hostelType"
                value={formData.hostelType}
                onChange={handleChange}
                required
              >
                <option value="Boys">Boys Hostel</option>
                <option value="Girls">Girls Hostel</option>
                <option value="Co-ed">Co-ed Hostel</option>
              </select>
            </div>

            <div className="hostel-field full-width">
              <label htmlFor="address">Full Address *</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter complete hostel address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="hostel-field">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="hostel-field">
              <label htmlFor="contactNumber">
                Contact Number *
              </label>
              <input
                id="contactNumber"
                type="tel"
                name="contactNumber"
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="hostel-field">
              <label htmlFor="totalRooms">Total Rooms *</label>
              <input
                id="totalRooms"
                type="number"
                name="totalRooms"
                placeholder="e.g. 50"
                min="1"
                value={formData.totalRooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="hostel-field">
              <label htmlFor="availableRooms">
                Available Rooms *
              </label>
              <input
                id="availableRooms"
                type="number"
                name="availableRooms"
                placeholder="e.g. 10"
                min="0"
                value={formData.availableRooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="hostel-field">
              <label htmlFor="roomCapacity">
                Room Capacity *
              </label>
              <select
                id="roomCapacity"
                name="roomCapacity"
                value={formData.roomCapacity}
                onChange={handleChange}
                required
              >
                <option value="">Select capacity</option>
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
                <option value="5">5 Persons</option>
              </select>
            </div>
          </div>

          <div className="hostel-form-actions">
            <button
              type="button"
              className="hostel-reset-btn"
              onClick={() => {
                setFormData({
                  hostelName: "",
                  hostelType: "Boys",
                  address: "",
                  city: "",
                  contactNumber: "",
                  totalRooms: "",
                  availableRooms: "",
                  roomCapacity: "",
                });
                setMessage("");
              }}
            >
              Reset
            </button>

            <button
              type="submit"
              className="hostel-submit-btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "+ Add Hostel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHostel;
