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
    date:{
        type: Date,
    },
    image: {
        type: Array,
        // required: [true, 'Why no image?']
    },
    isVisible: { type: Boolean, default: true },

});

const Newss = mongoose.model('News', newsSchema );

export {Newss};
