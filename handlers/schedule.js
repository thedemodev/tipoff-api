const axios = require('axios');
const backupSchedule = require('../data/schedule.json');
const { capitalize, flatten } = require('./helper');

exports.getMonth = async (req, res) => {
  const liveSchedule = await getLiveSchedule();

  let schedule;

  if (isLiveAvailable(liveSchedule)) {
    schedule = liveSchedule;
    console.log('using online');
  } else {
    schedule = backupSchedule;
    console.log('using backup');
  }

  const monthParam = capitalize(req.params.month);
  const monthData = schedule.lscd.filter(month => {
    return month.mscd.mon === monthParam;
  });
  //   returning one month
  res.json(monthData[0].mscd.g);
};
exports.getTeamSchedule = (req, res) => {
  const teamId = parseInt(req.params.teamId);
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

// checks whether object returned from fetch was an actual schedule
const isLiveAvailable = schedule => {
  if (typeof schedule === 'object') {
    return Object.keys(schedule).length > 0;
  } else {
    return false;
  }
};
