import mongoose from "mongoose";
let Schema = mongoose.Schema;

const registerSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Why no username?']
    },
    email: {
        type: String,
        required: [true, 'Why no email?']
    },
    password: {
        type: String,
        required: [true, 'Why no password?']
    },


    isVisible: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

const Register = mongoose.model('Registers', registerSchema );

export {Register};
