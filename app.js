const express = require("express");
const app = express();

const logger = require("./logger");

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => logger.info(`Server is running ${PORT}`));
