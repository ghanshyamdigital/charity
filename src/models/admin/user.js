import mongoose from "mongoose";

const Users = mongoose.model('Users', {
    email: {
        type: String
    },
    password: {
        type: String
    }
});

export {Users};
