import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique:true,
    },
    homeAddress: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    skillSets: {
      type: Array,
      required: false,
    },
  },

  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
