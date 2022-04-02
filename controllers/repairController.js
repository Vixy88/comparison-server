import Repair from "../models/repair.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import company from "../models/company.js";

// ! CREATE A NEW REPAIR
async function createRepair(req, res, next) {
  const newRepair = req.body; // This gives us an object (the repair we want to make)
  try {
    // ! Creates a new repair on the database
    const createdRepair = await Repair.create(newRepair);
    console.log(createdRepair);
    res.status(201).json(createdRepair);
  } catch (e) {
    next(e);
  }
}

// ! DELETE A REPAIR
async function deleteRepair(req, res, next) {
  const repairId = req.params.id;
  try {
    const deletedRepair = await Repair.findOneAndDelete({ _id: id });
    console.log(deletedRepair);
    if (!deletedRepair) {
      return res.status(400).json({
        message: `We were not able to find a repair with the id of ${repairId}, please check your details and try again`,
      });
    }
  } catch (e) {
    next(e);
  }
}

export default {
  createRepair,
  deleteRepair,
};
