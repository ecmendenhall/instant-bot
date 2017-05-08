const instantBot = require('instant-bot');

// This Twitter bot retweets mentions and tweets that it sees in its home timeline
// if they don't contain the letter "e"

module.exports.run = () => {

  instantBot().then((bot) => {

    // Access new messages since last time the bot ran
    bot.messages.filter((m) => {
       // Filter messages with "e"
      return !(m.text.includes('e') || m.text.includes('E'))
    }).map((message) => {
       // Use the Twit client to create a retweet directly
       bot.client.post('statuses/retweet/:id', {id: message.id_str})
    });

    bot.mentions.filter(
      m => !(m.text.includes('e') || m.text.includes('E'))
    ).map(
      message => bot.client.post('statuses/retweet/:id', {id: message.id_str})
    );
  });

};
