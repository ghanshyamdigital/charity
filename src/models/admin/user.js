import mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'

const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema(
    {
      email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      username: {type: String, required: true},
      phone: String,
      profilePic: String,
      hash: {type: String, required: true},
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      gender: String,
      contact: Object,
      hashKey: String
    }, {
      timestamps: true
    }, {collection: 'User'});
  
  let UsersModel = mongoose.model('User', UserSchema);

  UsersModel.authenticate = ({email, password}) => {
    console.log(email,password)
    const user = UsersModel.findOne({email});
    if (user && bcrypt.compareSync(password, user.hash)) {
      const {hash, ...userWithoutHash} = user.toObject();
      const token = jwt.sign({sub: user.id}, config.secret);
      return {
        ...userWithoutHash,
        token
      }
    }
  };
  UsersModel.getUserByEmail = (email) => {
    return UsersModel.findOne({email: email})
  };
  
  UsersModel.getUserByName = (username) => {
    return UsersModel.findOne({username: username})
  };
  UsersModel.addUser = (userToAdd, password) => {
    const user = new UsersModel(userToAdd);
  
    // hash password
    if (password) {
      user.hash = bcrypt.hashSync(password, 10)
    }
  
    user.save();
  
    return user
  };
export default UsersModel
