import mongoose from "mongoose";
let Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        // required: [true, 'Why no title?']
    },
    description: {
        type: String,
        // required: [true, 'Why no text?']
    },
    image: {
        type: String,
        // required: [true, 'Why no image?']
    },
    isVisible: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

const Newss = mongoose.model('News', newsSchema );

export {Newss};
