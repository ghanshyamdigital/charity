import express from 'express';
import {Volunteers} from "../../../models/admin/volunteer";

let router = express.Router();

router.get("/", function(req, res, next) {
    res.render('Client/views/Dashboard',{ "title":"Add Volunteer","records":"","proof":proof})
});
router.get("/contactUs", function(req, res, next) {
    res.render('Client/views/contact-us')
});
const proof = [{title:"Aadhar card",value:"aadharcard"},
    {title:"Votingcard",value:"votingcard"},
    {title:"Driving licence",value:"driving_licence"}];

router.get("/volunteer", function(req, res, next) {
    res.render('Client/views/volunteer/volunteer',{ "title":"Add Volunteer","records":"","proof":proof})
});
router.get("/donation", function(req, res, next) {
    res.render('Client/views/donation/DonationDialog')
});
router.get("/causes", function(req, res, next) {
    res.render('Client/views/causes/causes')
});
router.get("/causes-detail", function(req, res, next) {
    res.render('Client/views/causes/causes-detail')
});
router.get("/causes-detail-with-sidebar", function(req, res, next) {
    res.render('Client/views/causes/causes-detail-with-sidebar')
});
router.get("/portfolio-detail", function(req, res, next) {
    res.render('Client/views/portfolio/portfolio-detail')
});
router.get("/portfolio", function(req, res, next) {
    res.render('Client/views/portfolio/portfolio')
});
router.get("/blog-full-width-details", function(req, res, next) {
    res.render('Client/views/blogs/blog-full-width-details')
});
router.get("/blog-full-width", function(req, res, next) {
    res.render('Client/views/blogs/blog-full-width')
});
router.get("/our-story", function(req, res, next) {
    res.render('Client/views/our-story')
});
router.get("/our-mission", function(req, res, next) {
    res.render('Client/views/our-mission')
});
router.get("/gallery-two-column", function(req, res, next) {
    res.render('Client/views/gallery/gallery-two-column')
});
router.get("/gallery", function(req, res, next) {
    res.render('Client/views/gallery/gallery')
});
router.get("/launch", function(req, res, next) {
    res.render('Client/views/launch')
});
router.get("/event-details", function(req, res, next) {
    res.render('Client/views/events/event-details')
});
router.get("/events", function(req, res, next) {
    res.render('Client/views/events/event')
});
router.post('/add',(req, res, next) => {
    console.log("form data",req.body)
    let Volunteer = new Volunteers({
        first_name: req.body.name,
        last_name: req.body.last_name,
        email:req.body.email,
        phone_number: req.body.phone,
        education: req.body.education,
        residence_proof: req.body.residence_proof,
        job_details: req.body.job_details,
        why_you_join: req.body.why_you_join,
        // image: req.files,
    });
    Volunteer.save().then((data) => {
        console.log(data)

        res.redirect('/volunteer');
    }, (e) => {
        res.status(400).send(e)
    });
});

export default router;
