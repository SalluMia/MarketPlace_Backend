const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.UN_AUTHORIZED:
      res.json({
        title: "UN AUTHORIZED",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Internal Server error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

      default:
        console.log('No error! All good')
        break;
  }
};

module.exports = errorHandler;
