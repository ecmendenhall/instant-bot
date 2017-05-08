'use strict';

const bot = require('./bot');

module.exports.runBot = (event, context, callback) => {
   bot.run();
   callback(null, { message: 'Your bot ran successfully!', event });
};
