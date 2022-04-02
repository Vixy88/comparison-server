import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // ? Inside here live our fields
  firstName: { type: String, required: false, maxLength: 30 },
  lastName: { type: String, required: false, maxLength: 30 },
  fullName: { type: String, required: false, unique: false },
  eMail: { type: String, required: false, unique: true, maxLength: 50 },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user", "partner"], default: "user" },
  profileImg: { type: String },
  registeredAt: { type: Date, default: Date.now },
});

// * Registering the schema with mongoose as a model.
// * It uses the first argument ('User') as a unique reference.
export default mongoose.model("User", userSchema);
