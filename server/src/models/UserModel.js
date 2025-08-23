import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, maxlength: 50 },
    likedMovies: { type: Array, default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
