const express = require('express')
const Controller = require('./../controllers/viewControllers')
const authController = require('./../controllers/authController')
const router = express.Router()
router.get('/',  Controller.getOverview);
router.get('/login',Controller.login)
router.get('/forget',Controller.forget)
router.get('/register',Controller.register)
router.get('/profile',Controller.profile);
module.exports = router