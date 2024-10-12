import mongoose, { Schema, models } from "mongoose";

const skillSetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    skillSets: {
      type: Array,
      required: true,
    }
  },

  { timestamps: true }
);

const SkillSet = models.workerSkillSet || mongoose.model("workerSkillSet", skillSetSchema);
export default SkillSet;
