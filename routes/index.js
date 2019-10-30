var express = require('express');
var router = express.Router();

const { getMonth } = require('../handlers/schedule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get schedule of a given month
router.get('/month/:month', getMonth);

module.exports = router;
