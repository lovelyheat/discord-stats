const chalk = require('chalk');
const moment = require('moment');

function logger(text) {
    if(typeof text !== 'string') throw new Error('Text value must be a string.');

    console.log(`${chalk.bgBlue('[' + moment().calendar() + ']')} ${text}`);
}

function errorLogger(err) {
    if(typeof err !== 'string') throw new Error('Text value must be a string.');

    console.log(`${chalk.bgRed('['+ moment().calendar() +']')} ${err}`);
}

module.exports = {
    log: logger,
    error: errorLogger,
}