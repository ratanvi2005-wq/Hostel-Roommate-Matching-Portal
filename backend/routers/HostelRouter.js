const express = require("express");
const router = express.Router();

const Hostel = require("../models/HostelModel");

// ==========================================
// 1. ADD NEW HOSTEL
// ==========================================
router.post("/add", async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    const result = await hostel.save();

    res.status(201).send({
      message: "Hostel added successfully",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error adding hostel",
      error: error.message
    });
  }
});


// ==========================================
// 2. GET ALL HOSTELS
// ==========================================
router.get("/getall", async (req, res) => {
  try {
    const result = await Hostel.find();

    res.status(200).send({
      message: "All hostels fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching hostels",
      error: error.message
    });
  }
});

// ==========================================
// 3. GET HOSTEL BY ID
// ==========================================
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await Hostel.findById(req.params.id);

    if (!result) {   
      return res.status(404).send({
        message: "Hostel not found"
      });
    }

    res.status(200).send({
      message: "Hostel fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching hostel",
      error: error.message
    });
  }
});

// ==========================================
// 4. GET HOSTELS BY CITY
// ==========================================
router.get("/getbycity/:city", async (req, res) => {
  try {
    const result = await Hostel.find({
      city: { $regex: req.params.city, $options: "i" }
    });

    res.status(200).send({
      message: "Hostels fetched by city",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching hostels",
      error: error.message
    });
  }
});

// ==========================================
// 5. GET HOSTELS BY TYPE
// ==========================================
router.get("/getbytype/:hostelType", async (req, res) => {
  try {
    const result = await Hostel.find({
      hostelType: req.params.hostelType
    });

    res.status(200).send({
      message: "Hostels fetched by type",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching hostels",
      error: error.message
    });
  }
});

// ==========================================
// 6. GET HOSTELS BY STATUS
// ==========================================
router.get("/getbystatus/:status", async (req, res) => {
  try {
    const result = await Hostel.find({
      status: req.params.status
    });

    res.status(200).send({
      message: "Hostels fetched by status",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching hostels",
      error: error.message
    });
  }
});

// ==========================================
// 7. SEARCH HOSTEL BY NAME
// ==========================================
router.get("/search/:name", async (req, res) => {
  try {
    const result = await Hostel.find({
      hostelName: { $regex: req.params.name, $options: "i" }
    });

    res.status(200).send({
      message: "Search results",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error searching hostel",
      error: error.message
    });
  }
});

// ==========================================
// 8. UPDATE HOSTEL
// ==========================================
router.put("/update/:id", async (req, res) => {
  try {
    const result = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).send({
        message: "Hostel not found"
      });
    }

    res.status(200).send({
      message: "Hostel updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating hostel",
      error: error.message
    });
  }
});

// ==========================================
// 9. DELETE HOSTEL
// ==========================================
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Hostel.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send({
        message: "Hostel not found"
      });
    }

    res.status(200).send({
      message: "Hostel deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting hostel",
      error: error.message
    });
  }
});

module.exports = router;


























/*
const express = require("express");
const Hostel = require("../models/Hostel");

const router = express.Router();

// Create a hostel
router.post("/", async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hostel created successfully",
      data: hostel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all hostels
router.get("/", async (req, res) => {
  try {
    const hostels = await Hostel.find();

    res.status(200).json({
      success: true,
      count: hostels.length,
      data: hostels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get hostel by ID
router.get("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hostel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid hostel ID",
    });
  }
});

// Update hostel
router.put("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hostel updated successfully",
      data: hostel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete hostel
router.delete("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hostel deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid hostel ID",
    });
  }
});

module.exports = router;
*/