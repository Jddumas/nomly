const express = require('express');
const router = express.Router();
const restaurants = require('../controllers/restaurants');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateRestaurant} = require('../middleware');
const {storage} = require('../cloudinary');
const multer  = require('multer');
const upload = multer({ storage });

const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

router.route('/')
    .get(catchAsync(restaurants.index))
    .post(isLoggedIn, upload.array('image'), validateRestaurant, catchAsync(restaurants.createRestaurant))


router.get('/new', isLoggedIn, restaurants.renderNewForm); 

router.route('/:id')
    .get(catchAsync(restaurants.showRestaurant))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateRestaurant, catchAsync(restaurants.updateRestaurant))
    .delete(isLoggedIn, isAuthor, catchAsync(restaurants.deleteRestaurant));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(restaurants.renderEditForm))

module.exports = router;