import express from 'express';

let router = express.Router();

router.get("/", function(req, res, next) {
    res.render('Client/views/Dashboard')
});
router.get("/contactUs", function(req, res, next) {
    res.render('Client/views/contact-us')
});

export default router;
