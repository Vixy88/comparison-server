import Company from "../models/company.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import company from "../models/company.js";

// ! CREATE A NEW COMPANY
async function createCompany(req, res, next) {
  const newCompany = req.body; // This gives us an object (the company we want to make)
  try {
    const companyFound = await Company.findOne({
      companyName: newCompany.companyName,
    });
    if (companyFound) {
      return res.status(400).json({
        message: `A company with the name ${newCompany.companyName}, already exists. Please choose another company name.`,
      });
    }

    // ! Creates a new company on the database
    const createdCompany = await Company.create(newCompany);
    console.log(createdCompany);
    res.status(201).json(createdCompany);
  } catch (e) {
    next(e);
  }
}

// ! DELETE A COMPANY
async function deleteCompany(req, res, next) {
  const companyId = req.params.id;
  console.log(companyId);
  try {
    const deletedCompany = await Company.findOneAndDelete({ _id: companyId });
    console.log(`${deletedCompany.companyName} has been deleted`);
    if (!deletedCompany) {
      return res.status(400).json({
        message: `We were not able to find a company with the id of ${companyId}, please check your details and try again`,
      });
    }
  } catch (e) {
    next(e);
  }
}

// ! SHOW ALL COMPANIES
async function index(req, res) {
  try {
    // ! Find the companies in mongodb
    const companies = await Company.find();
    res.send(companies);
  } catch (e) {
    res.send({ message: "there was a problem finding your companies" });
  }
}

export default {
  createCompany,
  deleteCompany,
  index,
};
