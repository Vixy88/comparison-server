import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ! REGISTERS A NEW USER
async function register(req, res, next) {
  try {
    const userAlreadyExists = await User.findOne({ eMail: req.body.eMail });
    if (userAlreadyExists) {
      return res.status(400).json({
        message:
          "💔 Oh no! The user already exists, please try another email 🙏",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
    console.log("Wohoo 💫, Your new user has been created" + newUser);
  } catch (e) {
    next(e);
  }
}

// ! LOGIN CONTROLLER FOR USERS
async function login(req, res, next) {
  try {
    const user = await User.findOne({ userName: req.body.eMail });
    if (!user) {
      // ! if the user does not exists
      return res.status(400).json({
        message:
          "🚷 No user with that email exists! Please check the email and try again.",
      });
    }

    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordsMatch) {
      return res.status(400).json({
        // ! IF PASSWORD IS NOT A MATCH
        message: "🔐 You have used an incorrect password, please try again!",
      });
    }

    const payload = {
      eMail: user.eMail,
      role: user.role,
    };

    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login Successful ✅" });
    console.log("User logged in successfully");
  } catch (e) {
    next(e);
  }
}

async function index(req, res) {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.send({ message: "There was a problem finding the users!" });
  }
}

export default {
  register,
  login,
  index,
};
