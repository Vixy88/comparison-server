// ? Middlewares are functions.
// ? They get run one after the other, based on the order in your server.js
// ? Each middleware is responsible for telling express to run the NEXT one.

export default function logger(req, res, next) {
  console.log(`🍿 Incoming request ${req.method} for url ${req.url}`);

  // ! Tell it we're done.
  next();
}
