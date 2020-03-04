import express from 'express';
import {Banners} from "./../models/admin/banner";
import {Newss} from "../models/admin/news";
import {Volunteers} from "../models/admin/volunteer";
import userController from '../controllers/users.controller'
import * as signedCookies from "admin-lte/plugins/jszip/jszip";

let router = express.Router();

router.get("/login", function(req, res, next) {
  if(req.cookies.token){
    res.redirect('/admin/dashboard')
    }else{
    res.render("login",{msg:''});
  }
});
router.get("/logout", function(req, res, next) {
  res.setHeader('set-cookie', 'token= ; max-age=0');
  res.redirect('/admin/login')
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

router.post('/admin/login', (req, res) => {
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
  userController.authenticate(req, res)
});

router.post('/register', (req, res) => {
  userController.addUser(req, res)
});
export default router;
