import express from "express";
import {Users} from "./../models/admin/user";

let router = express.Router();
// Get All User Data
router.get('/', (req, res) => {
  console.log('users');
  Users.find({})
      .then((data)=>{
        const dataObject = {"title":"Users","users":data}
        res.send({"data":dataObject})
      })
      .catch((err)=>{
        console.log(err)
      })
});

// Add New User Data
router.post('/', (req, res, next) => {
  let User = new Users({
    email: req.body.email,
    password: req.body.password
  });
  User.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e)
  });
});

// Get Single User Data
router.get('/:id', (req, res) => {
  Users.find({"_id": req.params.id})
      .then((data)=>{
          const dataObject = {"modalTitle": "Edit User", "modalSubmit": "Update", "users": data};
        res.send({"data":dataObject})
      })
      .catch((err)=>{
        console.log(err)
      })
});

//Update Single User Data
router.post('/:id', (req, res) => {
  Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      // the callback function
      (err, user) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        res.send('success');
      }
  )
});

//Delete Single User Data
router.delete('/:id', (req, res) => {
  Users.findByIdAndRemove(
      req.params.id,
      // the callback function
      (err, user) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.status(200).send("sucess");
      }
  )
});

export default router;
