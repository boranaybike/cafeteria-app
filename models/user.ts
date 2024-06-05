import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    name: {
    type: String,
  },
    lastname: {
    type: String,
    required: [true, "Username is required!"],
  },
    password: {
    type: String
  }
})

const User = models.User || model("User", UserSchema)

export default User