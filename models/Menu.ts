import { Schema, model, models } from 'mongoose';

const MenuSchema = new Schema({
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

const Menu = models.Menu || model("Menu", MenuSchema)

export default Menu