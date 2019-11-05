const schedule = require('../data/schedule.json');

exports.getMonth = (req, res) => {
  let monthData = {};
  const monthParam = capitalize(req.params.month);
  monthData = schedule.lscd.filter(month => {
    return month.mscd.mon === monthParam;
  });
  //   returning one month
  res.json(monthData[0].mscd.g);
};

//helper to capitalize string
const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
