import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const Booking = models.Booking || model("Booking", BookingSchema)

export default Booking
