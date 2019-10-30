const schedule = require('../data/schedule.json');

exports.getMonth = (req, res) => {
  let monthData = {};
  const monthParam = req.params.month;
  monthData = schedule.lscd.filter(month => {
    return month.mscd.mon === monthParam;
  });
  //   returning one month
  res.json(monthData[0].mscd.g);
};
