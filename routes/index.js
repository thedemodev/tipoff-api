var express = require('express');
var router = express.Router();

const { getMonth, getTeamSchedule } = require('../handlers/schedule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get schedule of a given month
router.get('/schedule/month/:month', getMonth);
router.get('/schedule/team/teamId', getTeamSchedule);

module.exports = router;
