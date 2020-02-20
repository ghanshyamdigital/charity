import express from "express";
import {Volunteers} from "../models/admin/volunteer";

let router = express.Router();

router.get('/',(req,res)=>{
    console.log('volunteers');
    Volunteers.find({})
        .then((data)=>{
            const dataObject = {"volunteers":data}
            res.render('volunteer/volunteers',{"data":dataObject})
        })
        .catch((err)=>{
            console.log(err)
        })
});
router.get('/add', (req, res) => {
    res.render('volunteer/volunteer-join');
});
router.post('/', (req, res, next) => {

    let Volunteer = new Volunteers({
        first_name: req.body.name,
        last_name: req.body.last_name,
        email:req.body.email

    });
    Volunteer.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e)
    });
});

export default router;