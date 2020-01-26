const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const magicItems = require('./MagicItemsList.json');
const axios = require('axios');

var found = null;
var randomNum;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

client.on('message', (msg) => {
	if (msg.content === '!ping') {
		msg.reply('pong');
	}
});

client.on('message', (msg) => {
	var item = msg.content.substring(6);
	found = magicItems.filter(function(magicItem) {
		return item == magicItem.Name;
	});
	if (msg.content.substring(0, 5) === '!item' && found.length > 0) {
		//console.log(found);
		var response = '';
		response = response + found[0].Name;
		response = response + '\n' + 'Type: ' + found[0].Type;
		response = response + '\n' + 'Rarity: ' + found[0].Rarity;
		found[0].Description.map((element) => {
			response = response + '\n' + element;
		});
		msg.reply(response);
	}
});

client.on('message', (msg) => {
	var msgCode = msg.content.substring(0, 4);
	if (msgCode === 'roll') {
		var roll = msg.content.substring(5);
		var res = roll.split(' ');
		//console.log(`Roll ${res[0]} ${res[1]} dice`);
		var num = res[0];
		var dice = res[1];
		axios
		.post(`https://api.random.org/json-rpc/2/invoke`, {
			jsonrpc: '2.0',
			method: 'generateIntegers',
			params: {
				apiKey: '5620e5c6-c925-469b-93df-6d647d5dcde7',
				n: num,
				min: 1,
				max: dice,
				replacement: true
			},
			id: 42
		})
		.then((res) => {
			var message = "";
			console.log(res.data.result.random.data);
			randomNum = res.data.result.random.data;
			randomNum.forEach(element => {
				message = message + " "  + element;
			});
			console.log(message);
			msg.reply(message);
		})
		.catch((error) => {
			console.error(error);
		});
	}
});