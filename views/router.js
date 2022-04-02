import express from "express";
// ? Import all my controllers
import companyController from "../controllers/companyController.js";
import userController from "../controllers/userController.js";
import repairController from "../controllers/repairController.js";
// import ratingController from "../controllers/ratingController.js";
import auth from "../middleware/auth.js";
import { check } from "express-validator";

// ? to set up routes.
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("API Running");
});

// ! COMPANY ROUTES
router
  .route("/companies")
  .get(companyController.index)
  .post(companyController.createCompany);

router
  .route("/company/:id")
  // .get(companyController.show)
  .delete(companyController.deleteCompany);

// router
//   .route("/company/update-description/:id")
//   .put(auth, companyController.updateDescription);

// ! USER ROUTES

// Register Controller
router.route("/register").post(userController.register);

// Login Controller
router.route("/login").post(userController.login);

// Route to display all registered users
router.route("/users").get(userController.index);

// ! REPAIR ROUTES

// Route to create repair
router.route("/repair").post(repairController.createRepair);

// Route to delete repair
router.route("/repair/:id").delete(repairController.deleteRepair);

// ! RATING ROUTES

// // Route to create ratings
// router.route("/company/:companyId/rating").post(
//   auth,
//   [check("text", "Text is missing").notEmpty()], // checks if the comment has the required text element
//   ratingController.create
// );

// // Route to update a specific rating
// router
//   .route("/company/:companyId/rating/:ratingId")
//   .put(auth, ratingController.update)
//   .delete(auth, ratingController.remove);

export default router;
