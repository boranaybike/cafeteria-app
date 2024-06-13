import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    card_number: {
      type: String,
      required: [true, "Please provide card number"],
      unique: true
    },
    password: {
       type: String,
       required: [true, "Please provide a password"]
    },
    role: {
       type: String    
    },
    first_name: {
       type: String    
    },
    last_name: {
       type: String    
    }
})

const User = models.User || model("User", UserSchema)

export default User