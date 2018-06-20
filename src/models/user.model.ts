import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean },
  verifyToken: { type: String },
  verifyExpires: { type: Date },
  verifyChanges: { type: Object },
  resetToken: { type: String },
  resetExpires: { type: Date },
})

const userModel = model('User', UserSchema)

export const UserModel = userModel
