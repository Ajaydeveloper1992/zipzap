import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userMetaSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meta_key: { type: String, required: true },
  meta_value: { type: String, required: true },
}, {
  timestamps: true, // Optional: include timestamps for created and updated
});

const UserMeta = mongoose.models.UserMeta || model('UserMeta', userMetaSchema);
export default UserMeta;