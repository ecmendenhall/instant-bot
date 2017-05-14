# Instant Bot
[![Build Status](https://travis-ci.org/ecmendenhall/instant-bot.svg?branch=master)](https://travis-ci.org/ecmendenhall/instant-bot) [![npm version](https://badge.fury.io/js/instant-bot.svg)](https://badge.fury.io/js/instant-bot) 

[<img alt="Remix on Glitch" width="200" src="https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix-button.svg" />](https://glitch.com/edit/#!/remix/instant-bot-template-twitter)

![Instant Bot Logo](https://raw.githubusercontent.com/ecmendenhall/instant-bot/master/assets/instantbot.png)

Instant bot is a command-line tool and lightweight framework for building Twitter/Mastodon bots that run on Glitch and AWS Lambda. It provides two tools: a CLI that wraps [Serverless Framework](https://serverless.com/) to create and deploy your bot, and a lightweight library that handles setting up your bot and configuring a Twitter/Mastodon client. The goal is to provide just enough framework to get up, running,
and out of the way so you can use Node, Glitch, and Serverless to build cool bots without worrying about the servers that run them.

:warning: :rotating_light: **Warning:** This project is still in development, and APIs may break at any time! :rotating_light: :warning:

## Installation

Instant Bot is an [npm package](https://www.npmjs.com/package/instant-bot). Install [node and npm](https://docs.npmjs.com/getting-started/installing-node), then install the `instant-bot` CLI with:

```
$ npm install -g instant-bot
```
You'll need an account for your bot on [Twitter](https://twitter.com/) or [Mastodon](https://mastodon.social/about).
If you want to deploy to Lambda, you'll also need an [AWS account](https://aws.amazon.com/). 

## Instant Bots on Glitch

[Glitch](https://glitch.com/) is a very cool platform for instantly running and remixing Node applications. 

## Creating an Instant Bot

To create an Instant Bot on Glitch, you don't need the `instant-bot` CLI. Instead, just click one of the buttons below:

**Twitter:** 

[<img alt="Remix on Glitch" width="200" src="https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix-button.svg" />](https://glitch.com/edit/#!/remix/instant-bot-template-twitter)

**Mastodon:** 

[<img alt="Remix on Glitch" width="200" src="https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix-button.svg" />](https://glitch.com/edit/#!/remix/instant-bot-template-mastodon)

### Anatomy of your Instant Bot

A new Glitch instant bot looks something like this:

```
$ tree lipogram-bot
.
├── .env - Stores secrets like your Twitter API keys.
├── .gitignore - Sane defaults so you don't check in your secrets!
├── bot.js - Where your bot code should live.
├── package.json - Dependencies, including the instant-bot library.
```


Let's walk through each of these files in order.

#### `.env`

Your instant bot uses [dotenv](https://www.npmjs.com/package/dotenv) to load secrets as enviroment variables when it starts up. Edit your new bot's `.env` and fill in the details.

If you're building a Twitter bot, your `.env` should looks something like this:

```
TWITTER_CONSUMER_KEY=<your twitter consumer key>
TWITTER_CONSUMER_SECRET=<your twitter consumer secret>
TWITTER_ACCESS_TOKEN=<your twitter access token>
TWITTER_ACCESS_TOKEN_SECRET=<your twitter access token secret>
```

If you're building a Mastodon bot, your `.env` will include Mastodon-related variables instead:

```
MASTODON_ACCESS_TOKEN=<your Mastodon access token>
MASTODON_API_URL="https://oulipo.social/api/v1/"
```

Don't worry! Glitch automatically wipes out these values when someone forks your project!

You'll need to get all these secrets from somewhere. Here's [a guide](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) on how to get your AWS access keys. Here's how to get [Twitter access tokens](https://dev.twitter.com/oauth/overview/application-owner-access-tokens). Here's a tool for generating your [Mastodon token](https://tinysubversions.com/notes/mastodon-bot/).


#### `.gitignore`

This file makes sure you don't accidentally check in your secret keys if you save your instant bot in a Git repository or push it to Github. It excludes your `.env` file and the `node_modules`
directory by default.

#### `bot.js`

The core of your application. It will look something like this:

```es6
const instantBot = require('instant-bot');

instantBot({service: 'twitter'}, (bot) => {
  bot.post('Hola from lipogram bot!');
  bot.messages.filter(m => !m.text.includes('e')).map((message) => {
    bot.client.post('statuses/retweet/:id', {id: message.id_str});
  });
});

```

Your instant bot is just a JS function. Call `instantBot` with some configuration options and pass in a function to create a new bot. Once your bot is initialized, you can post messages, read new messages and mentions, and access the underlying Twitter/Mastodon client to do whatever the heck else you want. Load your favorite modules and go crazy—Instant Bot is designed to load a client and get out of your way. For all the details on what you can do with a `Bot`, see ["The Bot API"]() below.

#### `package.json`

NPM looks in here for your project's dependencies. Make sure `instant-bot` is in here under the "dependencies" section. To add new stuff, run:

```
$ npm install --save <package-name>
```

That's it! If your bot is complex, you'll probably want to create and `require` your own modules. If it's simple, you can open `bot.js` and start hacking!

You can see this whole example [here](https://github.com/ecmendenhall/instant-bot/tree/master/examples/lipogram-bot).

## Instant Bots on AWS Lambda

If you're building a more complicated bot, you may want to run it on AWS Lambda.

### Creating an Instant Bot

To create a new bot, run:

```
$ instant-bot create
```

The CLI will prompt you for a project name and ask whether you're building a bot for Twitter or Mastodon.

### Anatomy of your Instant Bot

Your new instant bot is a [serverless framework](https://serverless.com/) application. The `instant-bot` CLI provides a handful of helper commands, but it's basically
a lightweight wrapper around Serverless.

A new instant bot looks something like this:

```
$ tree lipogram-bot
.
├── .env - Stores secrets like your Twitter API keys.
├── .gitignore - Sane defaults so you don't check in your secrets!
├── bot.js - Where your bot code should live.
├── handler.js - The handler function that AWS Lambda calls to start your bot every time it runs.
├── package.json - Dependencies, including the instant-bot library.
└── serverless.yml - Serverless Framework configuration.
```


Let's walk through each of these files in order.

#### `.env.example`

Your instant bot uses [dotenv](https://www.npmjs.com/package/dotenv) to load secrets as enviroment variables when it starts up. Edit your new bot's `.env` and fill in the details.

If you're building a Twitter bot, your `.env` should looks something like this:

```
AWS_ACCESS_KEY_ID=<your AWS access key ID>
AWS_SECRET_ACCESS_KEY=<your AWS secret access key>
TWITTER_CONSUMER_KEY=<your twitter consumer key>
TWITTER_CONSUMER_SECRET=<your twitter consumer secret>
TWITTER_ACCESS_TOKEN=<your twitter access token>
TWITTER_ACCESS_TOKEN_SECRET=<your twitter access token secret>
```

If you're building a Mastodon bot, your `.env` will include Mastodon-related variables instead:

```
MASTODON_ACCESS_TOKEN=<your Mastodon access token>
MASTODON_API_URL="https://oulipo.social/api/v1/"
```

You'll need to get all these secrets from somewhere. Here's [a guide](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) on how to get your AWS access keys. Here's how to get [Twitter access tokens](https://dev.twitter.com/oauth/overview/application-owner-access-tokens). Here's a tool for generating your [Mastodon token](https://tinysubversions.com/notes/mastodon-bot/).

**Note:** `.env.example` is just an example file! Make sure you create your own `.env` file including all the variables in `.env.example` or your bot won't work!

#### `.gitignore`

This file makes sure you don't accidentally check in your secret keys if you save your instant bot in a Git repository or push it to Github. It excludes your `.env` file and the `node_modules`
directory by default.

#### `bot.js`

The core of your application. It will look something like this:

```es6
const instantBot = require('instant-bot');

module.exports.run = () => {

  instantBot({service: 'twitter'}, (bot) => {
    bot.post('Hola from lipogram bot!');
    bot.messages.filter(m => !m.text.includes('e')).map((message) => {
      bot.client.post('statuses/retweet/:id', {id: message.id_str})
    });
  });

};
```

Your instant bot is just a JS function. Call `instantBot` with some configuration options and pass a function to create a new bot. Once your bot is initialized, you can post messages, read new messages and mentions, and access the underlying Twitter/Mastodon client to do whatever the heck else you want. Load your favorite modules and go crazy—Instant Bot is designed to load a client and get out of your way. For all the details on what you can do with a `Bot`, see ["The Bot API"]() below.

#### `handler.js`

This is the Serverless Framework [handler](https://serverless.com/framework/docs/providers/aws/guide/services#handlerjs) that AWS Lambda will call every time your bot runs. It's pretty simple
by default: it just imports and runs your bot code. (But it can do anything a Serverless handler can do, if you want!)

```es6
'use strict';

const bot = require('./bot');

module.exports.runBot = (event, context, callback) => {
  bot.run();
  callback(null, { message: 'Your bot ran successfully!', event });
};
```

**Note:** Lambda is stateless! If your bot needs persistent data, you'll have to store it somewhere else. Consider writing JSON data to S3, or saving data to a DynamoDB table.

#### `package.json`

NPM looks in here for your project's dependencies. Make sure `instant-bot` is in here under the "dependencies" section. To add new stuff, run:

```
$ npm install --save <package-name>
```

**Note:** When Serverless deploys your bot to AWS Lambda, it zips up and uploads your bot's project directory—including its `node_modules`! If you add a new dependency, make sure to install
it with `npm install` before deploying your bot! Lamda won't run `npm install` when it deploys your bot—it's up to you to run it locally!

#### `serverless.yml`

A Serverless Framework [configuration file](https://serverless.com/framework/docs/providers/aws/guide/services#serverlessyml). Your instant bot's file is pretty simple by default:

```yml
service: lipogram-bot

provider:
  name: aws
  runtime: nodejs6.10

package:
  include:
    - .env
    - node_modules

functions:
  runBot:
    handler: handler.runBot
    events:
      - schedule: rate(1 minute)
```

This configures the Lambda function that runs your bot to run on Node 6.10 and trigger `handler.runBot` every minute. You can do [lots and lots of stuff](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/) with your `serverless.yml`, including spinning up other AWS resources, tweaking and triggering your Lambda function's configuration, and making your bot respond to other
events, like HTTP requests or SNS messages. You have the full power of Serverless at your disposal.

That's it! If your bot is complex, you'll probably want to create and `require` your own modules. If it's simple, you can open `bot.js` and start hacking!

You can see this whole example [here](https://github.com/ecmendenhall/instant-bot/tree/master/examples/lipogram-bot).

### Deploying your Instant Bot

Once you've copied your secrets to `.env`, and installed your bot's dependencies with `npm install`,
deploy your bot with:

```
$ instant-bot deploy
```

This basically just delegates to `serverless deploy`. Since your bot is just a serverless app, you
can use the Serverless CLI to deploy it, too.

### Debugging your Instant Bot

To see your bot's logs, run:

```
$ instant-bot logs
```

(This delegates to `serverless logs -f runBot`.)

### Removing your Instant Bot

To shut down your bot and delete its Lambda, run:

```
$ instant-bot remove
```

(This delegates to `serverless remove`. Get the picture? :smile_cat:)


## The Bot API

### Configuration
To create a new bot, `require('instant-bot')` and call it with configuration options:

```es6
const instantBot = require('instant-bot');

instantBot({
  service: 'twitter',
  rate: '1 minute',
  host: 'aws'
});
```

Options:
- `service`: The service your bot will use. Either `'twitter'` or `'mastodon'`.
- `rate`: How frequently your bot should post new messages. This can be any human-readable time [juration](https://www.npmjs.com/package/juration) can parse, like `'30 minutes'` or `'2 days'`.
- `host`: Where your bot runs. Either `'aws'` or `'glitch'`

### The `Bot` object

When your bot spins up, it loads some useful data:

Attributes:
- `bot.messages`: an array of new messages from users your bot follows.
- `bot.mentions`: an array of new messages that mention your bot.
- `bot.recentPosts`: an array containing the last few messages your bot posted.

Your bot keeps track of the last time it ran, so these only load new messages and mentions. Each of
these arrays contains

The `Bot` object also provides a convenience method for posting a new message. This is super simple
right now:

Methods:
- `bot.post(message)`: post a message to your bot's timeline.

Finally, your bot has access to its underlying Twitter/Mastodon client if you want do do anything
more complex:

Attribute:
- `bot.client`: your bot's underlying client library. This is [`twit`](https://github.com/ttezel/twit) for Twitter and [`node-mastodon`](https://www.npmjs.com/package/mastodon) for Mastodon.

The bot API is meant to be a little bit of sugar on top of the underlying client library. This
abstraction is intentionally leaky: use the client library to do the really complex stuff!

## More Resources
- [Serverless Framework documentation](https://serverless.com/framework/docs/)
- [Twit documentation](https://github.com/ttezel/twit)
- [node-mastodon documentation](https://github.com/jessicahayley/node-mastodon)

## Contributions
Are welcome! Open an issue or send a pull request.

## License
This project is released under an MIT license. See LICENSE.txt if you want to read one.
