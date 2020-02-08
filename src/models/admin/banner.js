import mongoose from "mongoose";
let Schema = mongoose.Schema;

const bannerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Why no title?']
    },
    text: {
        type: String,
        required: [true, 'Why no text?']
    },
    image: {
        type: String,
        required: [true, 'Why no image?']
    },
    isVisible: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

const Banners = mongoose.model('Banners', bannerSchema );

export {Banners};
