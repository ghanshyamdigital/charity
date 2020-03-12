import express from 'express'
import multer from 'multer'
import path from 'path'
import { events } from './../models/admin/events'
import moment from 'moment'

let router = express.Router()

let Storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, files, cb) => {
    console.log(files)
    cb(null, files.fieldname + '_' + Date.now() + '_' + path.extname(files.originalname))
  }
})

let upload = multer({
  storage: Storage
}).any('eventImage', 'bannerImage')

// let upload2 = multer({
//     storage:Storage
// }).array('bannerImage',3);

// Get All Banner Data
router.get('/', (req, res) => {
  console.log('users')
  events.find({})
    .then((data) => {
      const dataObject = data
      console.log('list event', dataObject)
      res.render('events/events', {'data': dataObject})
    })
    .catch((err) => {
      console.log(err)
    })
})

// Get All Banner Data
router.get('/add', (req, res) => {
  console.log('users')

  res.render('events/events-add', {'title': 'Add Events', 'records': '', 'date': ''})

})

// Add New Banner Data
router.post('/add', upload, (req, res, next) => {
  console.log('date update', moment(req.body.date).format('L'))

  let Event = new events({
    event_name: req.body.events_name,
    venue: req.body.venue,
    bannerImage: req.files,
    date: moment(req.body.date).format('L'),
    image: req.files,
    time: req.body.time,
  })
  console.log('body', Event.date)
  Event.save().then((data) => {
    console.log('multiple', data)
    res.redirect('/admin/events')
  }, (e) => {
    res.status(400).send(e)
  })
})

router.get('/:id', (req, res) => {

  events.find({'_id': req.params.id})
    .then((data) => {
      const dataObject = {'events': data}
      res.send({'data': dataObject})
    })
    .catch((err) => {
      console.log(err)
    })
})

//Update Single Banner Data
router.post('/:id', (req, res) => {
  events.findByIdAndUpdate(
    req.params.id,
    req.body,
    // the callback function
    (err, banner) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err)
      res.send('success')
    }
  )
})
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id
  var edit = events.findById(id)
  edit.exec(function (err, data) {
    console.log('editdata', data)
    console.log('dateedit', moment(data.date).format('L'))
    if (err) throw err
    res.render('events/events-add', {'title': 'Edit Event', 'records': data, 'date': moment(data.date).format('L')})
  })

})
router.post('/edit/:id', upload, function (req, res, next) {
  var id = req.params.id
  if (req.files) {
    var dataRecords = {
      event_name: req.body.events_name,
      venue: req.body.venue,
      bannerImage: req.files,
      date: req.body.date,
      image: req.files,
      time: req.body.time,

    }
  } else {
    var dataRecords = {
      event_name: req.body.events_name,
      venue: req.body.venue,
      date: req.body.date,
      time: req.body.time,
    }
  }
  var edit = events.findByIdAndUpdate(id, dataRecords)
  edit.exec(function (err, data) {
    if (err) throw err
    res.redirect('/admin/events')
  })

})
router.get('/delete/:id', (req, res) => {

  console.log('paramsId', req.params._id)
  events.findByIdAndRemove(
    req.params.id,
    // the callback function
    (err, events) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err)
      return res.redirect('/admin/events')
    }
  )
})

export default router
