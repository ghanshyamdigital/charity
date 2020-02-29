import express from 'express';

let router = express.Router();

import userController from '../controllers/users.controller'
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });`
// });
router.get("/login", function(req, res, next) {
  // res.render("login",{msg:''});
  if(req.cookies.token){
    res.redirect('/dashboard') 
    }else{  res.render("login",{msg:''});}
});
router.get("/", function(req, res, next) {
  res.redirect("/login");
});
router.get("/register", function(req, res, next) {
  res.render("register");
});
router.get("/dashboard", function(req, res, next) {
    res.render('dashboard')
});

router.post('/login', (req, res) => {
  console.log("req",req.body);
  
  userController.authenticate(req, res) 
});

router.post('/register', (req, res) => {
  userController.addUser(req, res)
});
export default router;
