import { Schema, model, models } from "mongoose";

const MovementSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: String
    },
    spending:{
        type: Number
    },
    payment:{
        type: Number
    },
    balance:{
        type: Number
    }
})

const Movement  = models.Movement || model("Movement", MovementSchema)

export default Movement