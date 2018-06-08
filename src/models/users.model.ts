import { Schema, Model, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const userModel = model('User', UserSchema)

export const UserModel = userModel
