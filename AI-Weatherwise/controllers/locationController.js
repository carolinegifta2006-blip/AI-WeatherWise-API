const Location = require("../models/Location");


// ADD LOCATION
exports.addLocation = async (req, res) => {
  try {
    const { city, country } = req.body;

    if (!city || !country) {
      return res.status(400).json({
        message: "City and country are required"
      });
    }

    const location = await Location.create({
      userId: req.user.userId,
      city,
      country
    });

    res.status(201).json({
      message: "Location added successfully",
      location
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add location",
      error: error.message
    });
  }
};


// GET LOCATIONS
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find({
      userId: req.user.userId
    });

    res.json(locations);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch locations",
      error: error.message
    });
  }
};


// UPDATE LOCATION
exports.updateLocation = async (req, res) => {
  try {
    const { city, country } = req.body;

    if (!city || !country) {
      return res.status(400).json({
        message: "City and country are required"
      });
    }

    const location = await Location.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      {
        city,
        country
      },
      {
        new: true
      }
    );

    if (!location) {
      return res.status(404).json({
        message: "Location not found"
      });
    }

    res.json({
      message: "Location updated successfully",
      location
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update location",
      error: error.message
    });
  }
};


// DELETE LOCATION
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!location) {
      return res.status(404).json({
        message: "Location not found"
      });
    }

    res.json({
      message: "Location deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete location",
      error: error.message
    });
  }
};