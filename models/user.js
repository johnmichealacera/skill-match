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
      required: false,
      unique:true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique:true,
      sparse: true,
    },
    facebook: {
      type: String,
      required: false,
    },
    homeAddress: {
      type: String,
      required: false,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    yearsExperience: {
      type: Number,
      required: false,
    },
    dailyRate: {
      type: Number,
      required: false,
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
    skillSetsImageByType: {
      type: Array,
      required: false,
    },
  },

  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
