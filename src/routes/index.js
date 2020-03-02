import express from 'express';
import {Banners} from "./../models/admin/banner";
import {news,Newss} from "../models/admin/news";
import {Volunteers} from "../models/admin/volunteer";

let router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/login", function(req, res, next) {
  res.render("login");
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
export default router;
