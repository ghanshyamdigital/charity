import express from "express";

import {Banners} from "./../models/admin/banner";

let router = express.Router();

// Get All Banner Data
router.get('/', (req, res) => {
    console.log('users');
    Banners.find({})
        .then((data)=>{
            const dataObject = {"banners":data}
            res.render('banner/banners',{"data":dataObject})
        })
        .catch((err)=>{
            console.log(err)
        })
});

// Get All Banner Data
router.get('/add', (req, res) => {
    res.render('banner/banner-add');
});

// Add New Banner Data
router.post('/', (req, res, next) => {

    let Banner = new Banners({
        title: req.body.title,
        text: req.body.text,
        image: req.body.image,
    });
    Banner.save().then((doc) => {
        res.send(doc);
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

//Delete Single Banner Data
router.delete('/:id', (req, res) => {
    Banners.findByIdAndRemove(
        req.params.id,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.status(200).send("sucess");
        }
    )
});

export default router;
