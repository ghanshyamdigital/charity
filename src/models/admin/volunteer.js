import mongoose from "mongoose";
let Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone_number:{
        type:Number,
    },
    education:{
        type:String,
    },
    residence_proof:{
        type: String,
    },
    job_details:{
        type: String,
    },
    why_you_join:{
        type: String,
    },
    image: {
        type: Array,
    },
    isVisible: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

const Volunteers = mongoose.model('Volunteers', volunteerSchema );

export {Volunteers};
