const express = require('express')
const Controller = require('./../controllers/viewControllers')
const router = express.Router()
router.get('/',  Controller.getOverview);
module.exports = router