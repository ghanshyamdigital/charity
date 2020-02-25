import express from "express";

import {Banners} from "./../models/admin/banner";

let router = express.Router();

// Get All Banner Data
router.get('/', (req, res) => {
    console.log("heloooooooooooooo")
    Banners.find({})
        .then((data)=>{
            const dataObject = data
            console.log('list banner',dataObject)
            res.render('banner/banners',{"data":dataObject})
        })
        .catch((err)=>{
            console.log(err)
        })
    // res.render('banner/banners')
});

// Get All Banner Data
router.get('/add', (req, res) => {
    console.log('users');
    // Banners.find({})
    //     .then((data)=>{
    //         const dataObject = data
    //         console.log('list banner',dataObject)
            res.render('banner/banner-add',{"title":"Add Banner","records":''})
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })

});

// Add New Banner Data
router.post('/add', (req, res, next) => {

    let Banner = new Banners({
        title: req.body.title,
        text: req.body.text,
        image: req.body.bannerImage,
    });
    Banner.save().then((data) => {
        res.render('banner/banner-add',{"title":"Add Banner","records":""});
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
        res.render('banner/banner-add', { "title":"Edit Banner","records":data });
    });

});
router.post('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    if(req.body.bannerImage){
        var dataRecords={
            title: req.body.title,
            text: req.body.text,
            image: req.body.bannerImage,
        }
    } else{
    var dataRecords={
        title: req.body.title,
        text: req.body.text,
        // image: req.body.bannerImage,
    }
    }
    var edit= Banners.findByIdAndUpdate(id,dataRecords);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('banner/banner-add', { "title":"Edit Banner","records":data });
    });

});
//Delete Single Banner Data
router.get('/delete/:id', (req, res) => {
    console.log("paramsId",req.params._id)
    Banners.findByIdAndRemove(
        req.params.id,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.redirect('/banners/')
        }
    )
});

export default router;
