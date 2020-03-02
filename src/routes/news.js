import express from "express";
import {news, Newss} from "../models/admin/news";
import multer from "multer";
import path from "path";

let router = express.Router();

let Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+file.originalname+"_"+path.extname(file.originalname));
    }
});

let upload = multer({
    storage:Storage
}).single('newsImage');

router.get('/',(req,res)=>{
    Newss.find({})
        .then((data)=>{
            const dataObject = data
            console.log('list banner',dataObject)
            res.render('news/news',{"data":dataObject})
        })
        .catch((err)=>{
            console.log(err)
        })
});

router.get('/add', (req, res) => {
    res.render('news/news-list',{ "title":"Add News","records":"" });
});

router.post('/add',upload, (req, res) => {
    let News = new Newss({
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename,
    });
    News.save().then((data) => {
        res.redirect('/news');
    }, (e) => {
        res.status(400).send(e)
    });
});

router.get('/delete/:id', (req, res) => {
    console.log("paramsId",req.params._id)
    Newss.findByIdAndRemove(
        req.params.id,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.redirect('/news')
        }
    )
});

router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    var edit= Newss.findById(id);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('news/news-list', { "title":"Edit News","records":data });
    });
});

router.post('/edit/:id',upload, function(req, res, next) {
    var id=req.params.id;
    if(req.file){
        var dataRecords={
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename,
        }
    } else{
        var dataRecords={
            title: req.body.title,
            description: req.body.description,
        }
    }
    var edit= Newss.findByIdAndUpdate(id,dataRecords);
    edit.exec(function(err,data){
        if(err) throw err;
        res.redirect('/news');
    });
});

export default router;