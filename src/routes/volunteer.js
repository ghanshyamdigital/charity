import express from "express";
import {Volunteers} from "../models/admin/volunteer";
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
}).single('image');

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
});

    const proof = [{title:"Aadhar card",value:"aadharcard"},
    {title:"Pancard",value:"pancard"},
    {title:"Driving licence",value:"driving_licence"}];

router.get('/add', (req, res) => {
    console.log('volunteers');
    res.render('volunteer/volunteer-join',{ "title":"Add Volunteer","records":"","proof":proof});
});

router.post('/add',upload,(req, res, next) => {
    let Volunteer = new Volunteers({
        first_name: req.body.name,
        last_name: req.body.last_name,
        email:req.body.email,
        residence_proof: req.body.residence_proof,
        phone_number: req.body.phone,
        image: req.file.filename,
    });
    Volunteer.save().then((data) => {
        res.redirect('/volunteers');
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
            return res.redirect('/volunteers')
        }
    )
});

router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    var edit= Volunteers.findById(id);
    edit.exec(function(err,data){
        console.log("volunteerData by Id",data)
        if(err) throw err;
        res.render('volunteer/volunteer-join', { "title":"Edit Volunteer","records":data,"proof":proof});
    });
});

router.post('/edit/:id',upload, function(req, res, next) {
    var id=req.params.id;
    if(req.file){
        var dataRecords={
            first_name: req.body.name,
            last_name: req.body.last_name,
            email:req.body.email,
            residence_proof: req.body.residence_proof,
            phone_number: req.body.phone,
            image: req.file.filename,
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
        res.redirect('/volunteers');
    });
});

export default router;