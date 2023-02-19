const logger = require("../logger");

module.exports = function (err, req, res, next) {
  logger.error("Error", err);
  res.status(500).send("Something failed");
};
