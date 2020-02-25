import express from "express";
import {news, Newss} from "../models/admin/news";
import {Volunteers} from "../models/admin/volunteer";
import {Banners} from "../models/admin/banner";
// import {Banners} from "../models/admin/banner";

let router = express.Router();

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
    // res.render('news/news');
});
router.get('/add', (req, res) => {

    res.render('news/news-list',{ "title":"Add News","records":"" });
});
router.post('/add', (req, res) => {

    let News = new Newss({
        title: req.body.title,
        description: req.body.description,
        image: req.body.newsImage
    });
    News.save().then((data) => {
        res.render('news/news-list',{ "title":"Add News","records":data });
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
            return res.redirect('/news/')
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
router.post('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    if(req.body.image){
        var dataRecords={
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        }
    } else{
        var dataRecords={
            title: req.body.title,
            description: req.body.description,

            // text: req.body.,
            // image: req.body.bannerImage,
        }
    }
    var edit= Newss.findByIdAndUpdate(id,dataRecords);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('news/news-list', { "title":"Edit News","records":data });
    });

});

export default router;