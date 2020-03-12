import mongoose from 'mongoose'

let Schema = mongoose.Schema

const contactSchema = new Schema({
  name: {
    type: String,
    // required: [true, 'Why no title?']
  },
  email: {
    type: String,
    // required: [true, 'Why no text?']
  },
  subject: {
    type: String,
    // required: [true, 'Why no text?']
  },
  message: {
    type: String,
    // required: [true, 'Why no image?']
  },
  isVisible: {type: Boolean, default: true},
  // date: { type: Date, default: Date.now },
})

const Contact_us = mongoose.model('Contact_us', contactSchema)

export { Contact_us }
