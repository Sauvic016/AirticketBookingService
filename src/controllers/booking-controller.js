const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services");

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  constructor() {
    // this.channel = channel;
  }

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a noti from queue",
        content: "Some queue will subscribe this",
        recepientEmail: "someuserEmail@gmail.com",
        notificationTime: "2023-01-28T12:44:06",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Successfully published the event",
    });
  }

  async create(req, res) {
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
  }

  async update(req, res) {
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
  }
}

module.exports = BookingController;
