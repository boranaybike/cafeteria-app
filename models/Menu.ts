import { Schema, model, models } from 'mongoose';

const menuSchema = new Schema({
    meal: {
        type: String
    },
    day: {
        type: String
    },
    date: {
        type: Date
    }
})

const Menu = models.Menu || model("Menu", menuSchema)

export default Menu