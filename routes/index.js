var express = require("express");
var router = express.Router();

const {
  getAllGames,
  getToday,
  getDay,
  getMonth,
  getTeamSchedule
} = require("../handlers/schedule");
const { getTeamInfo, getAllTeams } = require("../handlers/team");

router.get("/schedule/", getAllGames);

router.get("/schedule/month/:month", getMonth);
router.get("/schedule/today", getToday);
router.get("/schedule/date/:date", getDay);

router.get("/schedule/team/:teamId", getTeamSchedule);

router.get("/teams/:team", getTeamInfo);
router.get("/teams/", getAllTeams);

module.exports = router;
