const axios = require('axios');
const backupSchedule = require('../data/schedule.json');
const { capitalize, flatten } = require('./helper');

exports.getAllGames = async (req, res) => {
  const liveSchedule = await getLiveSchedule();
  const schedule = pickSchedule(liveSchedule);
  const allGames = schedule.lscd.map(month => {
    return month.mscd.g;
  });
  res.json(flatten(allGames));
};

exports.getDay = async (req, res) => {
  const dateParam = req.params.date;
  const data = await getDate(dateParam);
  res.json(data);
};

exports.getToday = async (req, res) => {
  const today = new Date();

  const data = await getDate(today.toISOString().slice(0, 10));
  res.json(data);
};

exports.getMonth = async (req, res) => {
  const liveSchedule = await getLiveSchedule();
  const schedule = pickSchedule(liveSchedule);
  const monthParam = capitalize(req.params.month);
  const monthData = schedule.lscd.filter(month => {
    return month.mscd.mon === monthParam;
  });
  //   returning one month
  res.json(monthData[0].mscd.g);
};

exports.getTeamSchedule = async (req, res) => {
  const teamId = parseInt(req.params.teamId);
  const liveSchedule = await getLiveSchedule();
  const schedule = pickSchedule(liveSchedule);
  const teamSchedule = schedule.lscd.map(month => {
    return month.mscd.g.filter(g => {
      return g.v.tid === teamId || g.h.tid === teamId;
    });
  });

  res.json(flatten(teamSchedule));
};

const getLiveSchedule = () => {
  return axios
    .get(
      `http://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/league/00_full_schedule.json`
    )
    .then(res => {
      if (res.status === 200) {
        return res.data;
      } else {
        return {};
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

const getDate = async date => {
  const liveSchedule = await getLiveSchedule();
  const schedule = pickSchedule(liveSchedule);
  const dateParam = date;
  const dateData = schedule.lscd.map(month => {
    return month.mscd.g.filter(g => {
      return g.gdte === dateParam;
    });
  });
  return flatten(dateData);
};

// checks whether object returned from fetch was an actual schedule, or use backup json schedule data
const pickSchedule = schedule => {
  if (typeof schedule === 'object') {
    if (Object.keys(schedule).length > 0) {
      console.log('using online schedule');
      return schedule;
    }
  } else {
    console.log('using backup json');
    return backupSchedule;
  }
};
