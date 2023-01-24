const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    return res.status(StatusCodes.OK).json({
      message: "Successfully completed booking",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};
const update = async (req, res) => {
  try {
    console.log(req.body);
    const response = await bookingService.updateBooking(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      message: "Successfully updated the booking",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

module.exports = {
  create,
  update,
};
