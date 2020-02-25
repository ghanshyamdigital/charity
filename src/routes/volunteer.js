import express from "express";
import {Volunteers} from "../models/admin/volunteer";
import {Banners} from "../models/admin/banner";
import {Newss} from "../models/admin/news";

let router = express.Router();

router.get('/',(req,res)=>{
    Volunteers.find({})
        .then((data)=>{
            const dataObject = data
            console.log("volunteers",dataObject)
            res.render('volunteer/volunteers',{"data":dataObject});
        })
        .catch((err)=>{
            console.log(err)
        })

    // res.render('volunteer/volunteers')
});
router.get('/add', (req, res) => {
    console.log('volunteers');
    res.render('volunteer/volunteer-join',{ "title":"Add Volunteer","records":"" });
});

router.post('/add', (req, res, next) => {

    let Volunteer = new Volunteers({
        first_name: req.body.name,
        last_name: req.body.last_name,
        email:req.body.email,
        residence_proof: req.body.residence_proof,
        phone_number: req.body.phone,
        image: req.body.image,

    });
    Volunteer.save().then((data) => {
        res.render('volunteer/volunteer-join',{ "title":"Add Volunteer","records":data });

    }, (e) => {
        res.status(400).send(e)
    });
});

router.get('/delete/:id', (req, res) => {
    console.log("paramsId",req.params._id)
    Volunteers.findByIdAndRemove(
        req.params.id,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.redirect('/volunteers/')
        }
    )
});

router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    var edit= Volunteers.findById(id);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('volunteer/volunteer-join', { "title":"Edit Volunteer","records":data });
    });

});
router.post('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    if(req.body.image){
        var dataRecords={
            first_name: req.body.name,
            last_name: req.body.last_name,
            email:req.body.email,
            residence_proof: req.body.residence_proof,
            phone_number: req.body.phone,
            image: req.body.image,

        }
    } else{
        var dataRecords={
            first_name: req.body.name,
            last_name: req.body.last_name,
            email:req.body.email,
            residence_proof: req.body.residence_proof,
            phone_number: req.body.phone,
            // image: req.body.image,
        }
    }
    var edit= Volunteers.findByIdAndUpdate(id,dataRecords);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('volunteer/volunteer-join', { "title":"Edit Volunteer","records":data });
    });

});


export default router;