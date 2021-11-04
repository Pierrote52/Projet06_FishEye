const express = require('express');
const router = express.Router();

const dataCtrl = require('../controllers/data');

router.get('/', dataCtrl.getAllDatas);

module.exports = router;