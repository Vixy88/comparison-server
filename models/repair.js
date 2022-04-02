import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  // ? Inside here live our fields
  itemName: { type: String, required: true },
  itemType: {
    type: String,
    enum: ["mobile", "computer", "watch", "jewellery"],
  },
  description: { type: String, required: false },
  frontImg: { type: String },
  backImg: { type: String },
  postcode: { type: String, required: false, unique: false },
  eMail: { type: String, required: false, unique: false, maxLength: 50 },
  registeredAt: { type: Date, default: Date.now },
});

// * Registering your schema with mongoose as a model.
// * It uses the first argument ('User') as a unique reference.
export default mongoose.model("Repair", repairSchema);
