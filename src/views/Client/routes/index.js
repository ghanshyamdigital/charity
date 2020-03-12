import express from 'express'
import { Volunteers } from '../../../models/admin/volunteer'
import multer from 'multer'
import path from 'path'
import { events } from '../../../models/admin/events'
import moment from 'moment'
import { Banners } from '../../../models/admin/banner'
import { Newss } from '../../../models/admin/news'
import { Contact_us } from '../../../models/admin/contact-us'

let router = express.Router()

let Storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, files, cb) => {
    cb(null, files.fieldname + '_' + Date.now() + '_' + path.extname(files.originalname))
  }
})

let upload = multer({
  storage: Storage
}).array('image', 3)

router.get('/', function (req, res, next) {
  Banners.find({})
    .then((data) => {
      const dataObject = data
      console.log('dataobject', dataObject[0].image[0].filename)
      res.render('Client/views/layouts/Dashboard2/Dashboard2', {'records': dataObject, 'proof': proof})
      //res.render('banner/banners',{"data":dataObject})
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/Dashboard2', function (req, res, next) {
  Banners.find({})
    .then((data) => {
      const dataObject = data
      console.log('dataobject', dataObject[0].image[0].filename)
      //res.render('Client/views/layouts/Dashboard3/Dashboard3', {'records': dataObject, 'proof': proof})

      res.render('Client/views/Dashboard', {
        'title': 'Add Volunteer',
        'records': dataObject,
        'proof': proof
      })

      //res.render('Client/views/Dashboard', {'records': dataObject, 'proof': proof})

      //res.render('banner/banners',{"data":dataObject})
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/Dashboard3', function (req, res, next) {
  Banners.find({})
    .then((data) => {
      const dataObject = data
      console.log('dataobject', dataObject[0].image[0].filename)
      res.render('Client/views/layouts/Dashboard3/Dashboard3', {'records': dataObject, 'proof': proof})

      //res.render('Client/views/Dashboard', {'records': dataObject, 'proof': proof})

      //res.render('banner/banners',{"data":dataObject})
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/contactUs', function (req, res, next) {
  Contact_us.find({})
    .then((data) => {
      const dataObject = data
      console.log('dataobject', dataObject)
      res.render('Client/views/contact-us')

      //res.render('Client/views/Dashboard', {'records': dataObject, 'proof': proof})

      //res.render('banner/banners',{"data":dataObject})
    })
    .catch((err) => {
      console.log(err)
    })

})
router.post('/contactUs', function (req, res, next) {
  console.log('form data', req.body)
  let Contact = new Contact_us({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,

  })
  Contact.save().then((data) => {
    res.render('Client/views/contact-us')
  }, (e) => {
    res.status(400).send(e)
  })
})

const proof = [{title: 'Aadhar card', value: 'aadharcard'},
  {title: 'Votingcard', value: 'votingcard'},
  {title: 'Driving licence', value: 'driving_licence'}]

router.get('/volunteer', function (req, res, next) {
  res.render('Client/views/volunteer/volunteer', {'title': 'Add Volunteer', 'records': '', 'proof': proof})
})
router.get('/donation', function (req, res, next) {
  res.render('Client/views/donation/DonationDialog')
})
router.get('/causes', function (req, res, next) {
  Newss.find({})
    .then((data) => {
      const dataObject = data
      res.render('Client/views/causes/causes', {'data': dataObject})
    })
    .catch((err) => {
      console.log(err)
    })

})
router.get('/causes-detail', function (req, res, next) {
  res.render('Client/views/causes/causes-detail')
})
router.get('/causes-detail-with-sidebar', function (req, res, next) {
  res.render('Client/views/causes/causes-detail-with-sidebar')
})
router.get('/portfolio-detail', function (req, res, next) {
  res.render('Client/views/portfolio/portfolio-detail')
})
router.get('/portfolio', function (req, res, next) {
  res.render('Client/views/portfolio/portfolio')
})
router.get('/blog-full-width-details', function (req, res, next) {
  res.render('Client/views/blogs/blog-full-width-details')
})
router.get('/blog-full-width', function (req, res, next) {
  res.render('Client/views/blogs/blog-full-width')
})
router.get('/our-story', function (req, res, next) {
  res.render('Client/views/our-story')
})
router.get('/our-mission', function (req, res, next) {
  res.render('Client/views/our-mission')
})
router.get('/gallery-two-column', function (req, res, next) {
  res.render('Client/views/gallery/gallery-two-column')
})
router.get('/gallery', function (req, res, next) {
  res.render('Client/views/gallery/gallery')
})
router.get('/launch', function (req, res, next) {
  res.render('Client/views/launch')
})
router.get('/event-details', function (req, res, next) {
  events.find({})
    .then((data) => {
      const dataObject = data
      console.log('list event', dataObject)
      res.render('Client/views/events/event-details', {'data': dataObject})
    })
    .catch((err) => {
      console.log(err)
    })
})
router.get('/events', function (req, res, next) {
  events.find({})
    .then((data) => {
      const dataObject = data
      console.log('list event', dataObject)
      res.render('Client/views/events/event', {'data': dataObject})
    })
    .catch((err) => {
      console.log(err)
    })
})
router.get('/:id', (req, res) => {

  events.find({'_id': req.params.id})
    .then((data) => {
      const dataObject = data
      console.log('list event', dataObject)

      res.render('Client/views/events/event-details', {'events': data})
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/volunteer', upload, (req, res, next) => {
  console.log('form data', req.body)
  let Volunteer = new Volunteers({
    first_name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone,
    education: req.body.education,
    residence_proof: req.body.residence_proof,
    job_details: req.body.job_details,
    why_you_join: req.body.why_you_join,
    image: req.files,
  })
  Volunteer.save().then((data) => {
    console.log(data)

    res.redirect('/volunteer')
  }, (e) => {
    res.status(400).send(e)
  })
})

export default router
