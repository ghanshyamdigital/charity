import express from "express";

let router = express.Router();

router.get('/',(req,res)=>{
    res.render('news/news');
});


export default router;