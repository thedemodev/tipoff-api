# tipoff REST API

A custom API created for NBA scheduling data since the official NBA API does not provide documentation or instructions.

## endpoints:
| Endpoint                 | Method |                  Params (Examples)                  |
| ------------------------ | :----: | :-------------------------------------------------: |
| `/schedule/`             | `GET`  |                         N/A                         |
| `/schedule/today`        | `GET`  |                         N/A                         |
| `/schedule/date/:date`   | `GET`  |            ISO date string(`2019-10-31`)            |
| `/schedule/month/:month` | `GET`  |               Month name (`october`)                |
| `/schedule/team/:teamid` | `GET`  |               Team ID (`1610612751`)                |
| `/teams/:team`           | `GET`  | teamId/abbrev/teamName (`1610612751`/`ATL`/`Hawks`) |

