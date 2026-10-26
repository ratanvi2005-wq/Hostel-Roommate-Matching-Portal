const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema(
  {
    // Hostel Basic Information
    hostelName: {
      type: String,
      required: true,
      trim: true
    },

    hostelType: {
      type: String,
      required: true,
      enum: ["Boys", "Girls", "Co-ed"]
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true
    },

    // Room Information
    totalRooms: {
      type: Number,
      required: true,
      min: 1
    },

    availableRooms: {
      type: Number,
      required: true,
      min: 0
    },

    roomCapacity: {
      type: Number,
      required: true,
      min: 1
    },

    // Hostel Facilities
    facilities: {
      type: [String],
      default: []
    },

    // Rent Information
    rentPerMonth: {
      type: Number,
      default: 6500,
      min: 0
    },

    // Hostel Description
    description: {
      type: String,
      default: "",
      trim: true
    },

    // Hostel Status
    status: {
      type: String,
      enum: ["Available", "Full", "Inactive"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Hostel", HostelSchema);