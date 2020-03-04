import * as jwt from 'jsonwebtoken'
import config from '../config/config.dev'
import generator from 'generate-password'
import User from '../models/admin/user'
import md5 from 'md5'


const bcrypt = require('bcryptjs');
const controller = {}
 
controller.authenticate = async (req, res) => {
console.log(req.body.email);

    try {
        const user = await User.getUserByEmail(req.body.email) ;
        console.log("userData",user);
        
        if (user === null) {
            return res.render("login", {msg: "invalid username and password."})
        }

        if (user && bcrypt.compareSync(req.body.password, user.hash)) {
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
            const {hash, ...userWithoutHash} = user.toObject();
            const token = jwt.sign({sub: user._id, role: user.role}, config.secret);
            const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
            res.cookie('token', token, {
                expires: new Date(Date.now() + expiration),
                secure: false, // set to true if your using https
                httpOnly: true,
              });
              console.log("cookies",res.cookie);
              
            res.redirect(302, '/admin/dashboard');
        } else {
            return res.render("login", {msg: "invalid password."})
        }

    } catch (err) {
        console.log(`Error in authenticate- ${err}`);
        res.status(400).send('Got error in authentication')
    }
};

controller.addUser = async (req, res) => {

    const name = req.body.firstName + '' + req.body.lastName;
    const userToAdd = User({
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hashKey: md5(name)
    });

    try {

        const user = await User.getUserByEmail(userToAdd.email);

        if (user) {
            return res.status(400).send({email: 'Email "' + user.email + '" is already taken.'})
        }

        const userByName = await User.getUserByName(userToAdd.username);
        if (userByName) {
            return res.status(400).send({username: 'Username "' + userByName.username + '" is already taken.'})
        }

        const savedUser = await User.addUser(userToAdd, req.body.password);
        console.log('Adding user...',savedUser);
        res.redirect(302, '/admin/login');

    } catch (err) {
    console.error(`Error in adding user- ${err}`);
        res.status(400).send('Got error in addUser')
    }
};
export default controller
