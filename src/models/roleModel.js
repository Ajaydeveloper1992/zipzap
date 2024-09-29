import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PermissionSchema = new Schema({
  add: { type: Boolean, default: false },
  view: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
}, { _id: false });

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
    },
    permissions: {
      type: Map,
      of: PermissionSchema, // This allows dynamic keys with the PermissionSchema structure
    },
    createdBy: {
      type: Schema.Types.ObjectId, // Assuming user IDs are ObjectIds
      ref: 'User', // Reference to the User model
      required: true, // Optional: make it required
    },
  }, 
  {
    timestamps: true,
  }
);

const Role = mongoose.models.Role || model("Role", RoleSchema);
export default Role;