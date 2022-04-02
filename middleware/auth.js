import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async function auth(req, res, next) {
  // ! Check the request for the token
  const rawToken = req.headers.authorization;
  if (!rawToken) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  const token = rawToken.split("Bearer ")[1].trim();
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const user = await User.findOne({ userName: decodedToken.userName });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorised - the user does not exist" });
    }

    // if (!tokenMatch) {
    //   return res.status(400).json({ message: "Invalid Token" });
    // }

    req.currentUser = user;
    next();
  } catch (e) {
    next(e);
  }
}
