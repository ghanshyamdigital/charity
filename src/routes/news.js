import express from "express";
import {Newss} from "../models/admin/news";
import multer from "multer";
import path from "path";
import moment from "moment";

let router = express.Router();

let Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,files,cb)=>{
        cb(null,files.fieldname+"_"+Date.now()+"_"+path.extname(files.originalname));
    }
});

let upload = multer({
    storage:Storage
}).array('newsImage',3);

router.get('/',(req,res)=>{
    Newss.find({})
        .then((data)=>{
            const dataObject = data;
            res.render('news/news',{"data":dataObject})
        })
        .catch((err)=>{
            console.log(err)
        })
});

router.get('/add', (req, res) => {
    res.render('news/news-list',{ "title":"Add News","records":"","date":"" });
});

router.post('/add',upload, (req, res) => {
    let News = new Newss({
        title: req.body.title,
        description: req.body.description,
        date:req.body.date,
        image: req.files,
    });
    News.save().then((data) => {
        res.redirect('/admin/news');
    }, (e) => {
        res.status(400).send(e)
    });
});

router.get('/delete/:id', (req, res) => {
    Newss.findByIdAndRemove(
        req.params.id,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.redirect('/admin/news')
        }
    )
});

router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    var edit= Newss.findById(id);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('news/news-list', { "title":"Edit News","records":data,"date":moment(data.date).format("YYYY-MM-DD") });
    });
});

router.post('/edit/:id',upload, function(req, res, next) {
    var id=req.params.id;
    if(req.files){
        var dataRecords={
            title: req.body.title,
            description: req.body.description,
            date:req.body.date,
            image: req.files,
        }
    } else{
        var dataRecords={
            title: req.body.title,
            description: req.body.description,
            date:req.body.date,
        }
    }
    var edit= Newss.findByIdAndUpdate(id,dataRecords);
    edit.exec(function(err,data){
        if(err) throw err;
        res.redirect('/admin/news');
    });
});

export default router;
