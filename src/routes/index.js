import express from 'express';

let router = express.Router();

import userController from '../controllers/users.controller'
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/login", function(req, res, next) {
  res.render("login");
});
router.get("/", function(req, res, next) {
  res.redirect("/login");
});
router.get("/dashboard", function(req, res, next) {
    res.render('dashboard')
});

router.post('/login', (req, res) => {
  userController.authenticate(req, res) 
});

router.post('/register', (req, res) => {
  userController.addUser(req, res)
});
export default router;
