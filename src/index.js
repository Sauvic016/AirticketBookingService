const express = require("express");

const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

const setupAndStartServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/bookingservice/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
