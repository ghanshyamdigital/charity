import express from 'express';
import {Banners} from "./../models/admin/banner";
import {news,Newss} from "../models/admin/news";
import {Volunteers} from "../models/admin/volunteer";
import userController from '../controllers/users.controller'

let router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/login", function(req, res, next) {
  // res.render("login",{msg:''});
  if(req.cookies.token){
    res.redirect('/dashboard')
    }else{  res.render("login",{msg:''});}
});
router.get("/", function(req, res, next) {
  Banners.countDocuments({}).exec((err,count)=>{
    Newss.countDocuments({}).exec((err,count_list)=>{
      Volunteers.countDocuments({}).exec((err,count_vol)=>{

        res.render("dashboard-v1",{Banners_list:count, Newss_list:count_list,Volunteers_list:count_vol});
      });
    });
  });
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
