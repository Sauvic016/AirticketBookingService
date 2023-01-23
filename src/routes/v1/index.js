const express = require("express");

const { BookingController } = require("../../controllers/");

const router = express.Router();

router.post("/bookings", BookingController.create);

module.exports = router;
