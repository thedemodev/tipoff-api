var express = require('express');
var router = express.Router();

const { getMonth, getTeamSchedule } = require('../handlers/schedule');
const { getTeamInfo } = require('../handlers/team');

// get schedule of a given month
router.get('/schedule/month/:month', getMonth);
router.get('/schedule/team/:teamId', getTeamSchedule);
router.get('/teams/:team', getTeamInfo);

module.exports = router;
