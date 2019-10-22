const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const magicItems = require('./MagicItemsList.json');

var found = null;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

client.on('message', msg => {
    if (msg.content === '!ping') {
      msg.reply('pong');
    }
  });

  client.on('message', msg => {
    var item = msg.content.substring(6);
    found = magicItems.filter(function(magicItem) {
      return item == magicItem.Name;
    });
    if (msg.content.substring(0,5) === '!item' && found != undefined) {
      msg.reply(found);
      console.log(found);
    }
  });