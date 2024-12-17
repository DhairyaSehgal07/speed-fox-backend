// the default middleware for express is an html page
// we're creating an api , so we want our errors to be
// a JSON object , that has an error message

// catch all for routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind == "ObjectId") {
    // checking for mongoose CastError
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
