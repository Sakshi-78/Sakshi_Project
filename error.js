const handleError = (statusCode, message, res) => {
    res.status(statusCode).send(message);
  };

//   const error = new Error();
//   error.status = status;
//   error.message = message;
//   return error;