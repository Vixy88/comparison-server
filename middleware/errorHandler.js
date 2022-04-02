// ? Error handling is a special piece of middleware.
// ? It has one additional argument to our function
// ! The err argument is new
export default function errorHandler(err, req, res, next) {
  if (err.name === "CastError") {
    return res.status(200).json({ message: "This is not a valid company" });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(400).json({ message: "invalid token" });
  }

  console.log("🍿 There was an error");
  console.log("The error is", err);

  // ! Default error, if we aren't more specific
  // ! 500 means something went wrong internally on the server.
  res.sendStatus(500);
}
