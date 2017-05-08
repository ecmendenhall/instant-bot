const instantBot = require('instant-bot');

module.exports.run = () => {

  instantBot().then((bot) => {
    bot.messages.filter(
      m => !(m.text.includes('e') || m.text.includes('E'))
    ).map(
      message => bot.service.client.post('statuses/retweet/:id', {id: message.id_str})
    );

    bot.mentions.filter(
      m => !(m.text.includes('e') || m.text.includes('E'))
    ).map(
      message => bot.service.client.post('statuses/retweet/:id', {id: message.id_str})
    );
  });

};
