import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  companyImg: { type: String },
  email: { type: String, required: true, unique: true },
  website: { type: String, required: false },
  number: { type: Number, required: false, unique: true },
  postcode: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  mobileRepair: { type: Boolean, required: false },
  computerRepair: { type: Boolean, required: false },
  electronicRepair: { type: Boolean, required: false },
  watchRepair: { type: Boolean, required: false },
  jewelleryRepair: { type: Boolean, required: false },
  // * Embedded Schema for Ratings
  ratings: [ratingSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Company", companySchema);
