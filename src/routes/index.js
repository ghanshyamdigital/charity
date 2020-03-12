import express from 'express';
import {Banners} from "./../models/admin/banner";
import {Newss} from "../models/admin/news";
import {Volunteers} from "../models/admin/volunteer";
import {events} from "../models/admin/events";
import userController from '../controllers/users.controller'

let router = express.Router();

router.get("/login", function(req, res, next) {
  if(req.cookies.token){
    res.redirect('/admin')
    }else{
    res.render("login",{msg:''});
  }
});
router.get("/logout", function(req, res, next) {
  res.setHeader('set-cookie', 'token= ; max-age=0');
  res.clearCookie('token');
  res.redirect('/admin/login')
 });

router.get("/register", function(req, res, next) {
  res.render("register");
});

router.get("/", function(req, res, next) {
  Banners.countDocuments({}).exec((err,count)=>{
    Newss.countDocuments({}).exec((err,count_list)=>{
      Volunteers.countDocuments({}).exec((err,count_vol)=>{
        events.countDocuments({}).exec((err,count_li)=>{

        res.render("dashboard",{Banners_list:count, Newss_list:count_list,Volunteers_list:count_vol,Event_list:count_li});
      });
    });
  });
});
});


router.post('/login', (req, res) => {
  userController.authenticate(req, res)
});

router.post('/register', (req, res) => {
  userController.addUser(req, res)
});
export default router;
