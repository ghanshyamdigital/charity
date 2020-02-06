import express from 'express';

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/login", function(req, res, next) {
  res.render("login");
});

router.get("/dashboardv1", function(req, res, next) {
  res.render("dashboard-v1");
});
export default router;
