import express from 'express';
import {Banners} from "./../models/admin/banner";
import {Newss} from "../models/admin/news";
import {Volunteers} from "../models/admin/volunteer";
import userController from '../controllers/users.controller'

let router = express.Router();

router.get("/login", function(req, res, next) {
  if(req.cookies.token){
    res.redirect('/dashboard')
    }else{  res.render("login",{msg:''});}
});

router.get("/", function(req, res, next) {
  console.log('sdfgsg');
  Banners.countDocuments({}).exec((err,count)=>{
    Newss.countDocuments({}).exec((err,count_list)=>{
      Volunteers.countDocuments({}).exec((err,count_vol)=>{
        res.render("dashboard",{Banners_list:count, Newss_list:count_list,Volunteers_list:count_vol});
      });
    });
  });
});

router.get("/register", function(req, res, next) {
  res.render("register");
});

router.get("/dashboard", function(req, res, next) {
  Banners.countDocuments({}).exec((err,count)=>{
    Newss.countDocuments({}).exec((err,count_list)=>{
      Volunteers.countDocuments({}).exec((err,count_vol)=>{

        res.render("dashboard",{Banners_list:count, Newss_list:count_list,Volunteers_list:count_vol});
      });
    });
  });
});

router.post('/login', (req, res) => {
  console.log("req",req.body);

  userController.authenticate(req, res)
});

router.post('/register', (req, res) => {
  userController.addUser(req, res)
});
export default router;
