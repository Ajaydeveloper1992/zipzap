import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "UserName is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lname: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: Schema.Types.ObjectId, // Reference to Role
      ref: 'Role',
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId, // Assuming user IDs are ObjectIds
      ref: 'User', // Reference to the User model
      required: false, // Optional: make it required
    },
    usertype: {
      type: String,
      required:false,
    },
    status: {
      type: String,
      required:false,
    },
    accessrestaurant: {
      type: String,
      required:false,
    },
  },
  {
    timestamps: true,
  } 
);

const User = mongoose.models.User || model("User", UserSchema);
export default User;