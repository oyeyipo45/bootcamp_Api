const express = require('express');

const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcampsController');

//Include other resource routers
const courseRouter = require('./courseRoutes');

const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
