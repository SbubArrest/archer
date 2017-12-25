const chalk = require('chalk');
const winston = require('winston');
const path = require('path');
const util = require('util');
const stripAnsi = require('strip-ansi');

let bot;

bot = {};
bot.configCache = new Map();

/* Global var */
const moment = require('moment');
require('winston-daily-rotate-file');
require('moment-duration-format');

/* Global var */
const config = require('./config.js').beta[0];
global.embedColor = config.embedColor;
global.embedColor = config.embedColor;
const {Client, PermLevels} = require('komada');

/* Global logger */
logger = new (
  winston.Logger
)({
  transports: [
    new (
      winston.transports.Console
    )({
      level    : 'silly',
      colorize : true,
      label    : `C 0`,
      timestamp: () => `[${chalk.grey(moment().format('HH:mm:ss'))}]`,
    }),
    new (
      winston.transports.DailyRotateFile
    )({
      colorize   : false,
      datePattern: '.yyyy-MM-dd',
      prepend    : true,
      json       : false,
      formatter  : function ({ level, message = '', meta = {}, formatter, depth, colorize }) {
        const timestamp = moment().format('YYYY-MM-DD hh:mm:ss a');
        const obj = Object.keys(meta).length
          ? `\n\t${meta.stack ? meta.stack : util.inspect(meta, false, depth || null, colorize)}`
          : '';
        return `${timestamp} [${level.toUpperCase()}] ${stripAnsi(message)} ${obj}`;
      },
      filename   : path.join(process.cwd(),`logs/Bot.log`),
    }),
  ],
});
const developers = config.developers;
const permStructure = new PermLevels()
  .addLevel(1, false, () => true)
  .addLevel(2, false, (client,msg) => msg.member.roles.exists("name", "Bot Commander"))
  .addLevel(9, false, (client,msg) => developers.includes(msg.author.id))
  .addLevel(10, false, (client, msg) => msg.author === client.owner);

const client = new Client({
 // ownerID      : config.ownerID,
  prefix       : config.prefix,
  permStructure,
  cmdLogging   : true,
  provider     : { engine: "mongodb" },
});

client.login(config.token);

module.exports = config;