import express from "express";
import multer from "multer";
import path from "path";
import {Banners} from "./../models/admin/banner";
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
}).array('bannerImage',3);

// Get All Banner Data
router.get('/', (req, res) => {
    Banners.find({})
        .then((data)=>{
            const dataObject = data;
            res.render('banner/banners',{"data":dataObject})
        })
        .catch((err)=>{
            console.log(err)
        })
});



// Get All Banner Data
router.get('/add', (req, res) => {
            res.render('banner/banner-add',{"title":"Add Banner","records":'',"date":''})

});

// Add New Banner Data
router.post('/add',upload, (req, res, next) => {

    let Banner = new Banners({
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        image: req.files,
    });

    Banner.save().then((data) => {
        res.redirect('/banners');
    }, (e) => {
        res.status(400).send(e)
    });
});

// Get Single Banner Data
router.get('/:id', (req, res) => {

    Banners.find({"_id": req.params.id})
        .then((data)=>{
            const dataObject = {"banner": data};
            res.send({"data":dataObject})
        })
        .catch((err)=>{
            console.log(err)
        })
});

//Update Single Banner Data
router.post('/:id', (req, res) => {
    Banners.findByIdAndUpdate(
        req.params.id,
        req.body,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            res.send('success');
        }
    )
});

router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    var edit= Banners.findById(id);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('banner/banner-add', { "title":"Edit Banner","records":data ,"date":moment(data.date).format("YYYY-MM-DD")});
    });

});
router.post('/edit/:id',upload, function(req, res, next) {
    var id=req.params.id;
    if(req.file){
        var dataRecords={
            title: req.body.title,
            text: req.body.text,
            date: req.body.date,
            image: req.file.filename,

        }
    } else{
    var dataRecords={
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
    }
    }
    var edit= Banners.findByIdAndUpdate(id,dataRecords);
    edit.exec(function(err,data){
        if(err) throw err;
        res.redirect('/banners');
    });

});
//Delete Single Banner Data
router.get('/delete/:id', (req, res) => {
    Banners.findByIdAndRemove(
        req.params.id,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.redirect('/banners')
        }
    )
});

export default router;
