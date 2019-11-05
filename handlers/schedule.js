const schedule = require('../data/schedule.json');

exports.getMonth = (req, res) => {
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

  res.json(teamSchedule);
};

//helper to capitalize string
const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
