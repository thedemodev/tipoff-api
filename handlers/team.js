const teamData = require('../data/teams.json');
const { capitalize } = require('./helper');
exports.getTeamInfo = (req, res) => {
  const teamParam = req.params.team;
  const teamInfo = teamData.filter(team => {
    return (
      team.teamId === parseInt(teamParam) ||
      team.abbreviation === teamParam.toUpperCase() ||
      team.simpleName === capitalize(teamParam)
    );
  });

  res.json(teamInfo);
};
