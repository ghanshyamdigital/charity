import express from "express";
import {Volunteers} from "../models/admin/volunteer";
import multer from "multer";
import path from "path";

let router = express.Router();

let Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,files,cb)=>{
        cb(null,files.fieldname+"_"+Date.now()+"_"+path.extname(files.originalname));
    }
});

let upload = multer({
    storage:Storage
}).array('image',3);

router.get('/',(req,res)=>{
    Volunteers.find({})
        .then((data)=>{
            const dataObject = data;
            res.render('volunteer/volunteers',{"data":dataObject});
        })
        .catch((err)=>{
            console.log(err)
        })
});

    const proof = [{title:"Aadhar card",value:"aadharcard"},
    {title:"Votingcard",value:"votingcard"},
    {title:"Driving licence",value:"driving_licence"}];

router.get('/add', (req, res) => {
    res.render('volunteer/volunteer-join',{ "title":"Add Volunteer","records":"","proof":proof});
});

router.post('/add',upload,(req, res, next) => {
    let Volunteer = new Volunteers({
        first_name: req.body.name,
        last_name: req.body.last_name,
        email:req.body.email,
        phone_number: req.body.phone,
        education: req.body.education,
        residence_proof: req.body.residence_proof,
        job_details: req.body.job_details,
        why_you_join: req.body.why_you_join,
        image: req.files,
    });
    Volunteer.save().then((data) => {
        console.log(data)

        res.redirect('/volunteers');
    }, (e) => {
        res.status(400).send(e)
    });
});

router.get('/delete/:id', (req, res) => {
    Volunteers.findByIdAndRemove(
        req.params.id,
        // the callback function
        (err, banner) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.redirect('/admin/volunteers')
        }
    )
});

router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    var edit= Volunteers.findById(id);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('volunteer/volunteer-join', { "title":"Edit Volunteer","records":data,"proof":proof});
    });
});

router.post('/edit/:id',upload, function(req, res, next) {
    var id=req.params.id;
    if(req.files){
        var dataRecords={
            first_name: req.body.name,
            last_name: req.body.last_name,
            email:req.body.email,
            phone_number: req.body.phone,
            education: req.body.education,
            residence_proof: req.body.residence_proof,
            job_details: req.body.job_details,
            why_you_join: req.body.why_you_join,
            image: req.files,
        }
    } else{
        var dataRecords={
            first_name: req.body.name,
            last_name: req.body.last_name,
            email:req.body.email,
            phone_number: req.body.phone,
            education: req.body.education,
            residence_proof: req.body.residence_proof,
            job_details: req.body.job_details,
            why_you_join: req.body.why_you_join,

            // image: req.body.image,
        }
    }
    var edit= Volunteers.findByIdAndUpdate(id,dataRecords);
    edit.exec(function(err,data){
        if(err) throw err;
        res.redirect('/admin/volunteers');
    });
});

export default router;
