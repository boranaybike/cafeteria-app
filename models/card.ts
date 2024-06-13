import { Schema, model, models } from "mongoose";

const CardSchema = new Schema({
     creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    number: {
        type: Number
    },
    balance: {
        type: Number
    }
    })

const Card  = models.Card || model("Card", CardSchema)

export default Card