import mongoose from "mongoose";
let Schema = mongoose.Schema;

const eventsSchema = new Schema({
    event_name: {
        type: String,
        // required: [true, 'Why no title?']
    },
    vanue: {
        type: String,
        // required: [true, 'Why no text?']
    },
    date: {
        type: Date,
        // required: [true, 'Why no text?']
    },
    image: {
        type: Array,
        // required: [true, 'Why no image?']
    },

        // required: [true, 'Why no image?']

    isVisible: { type: Boolean, default: true },
    // date: { type: Date, default: Date.now },
});

const events = mongoose.model('Events', eventsSchema );

export {events};
