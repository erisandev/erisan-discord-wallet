// bot.js

const Discord = require('discord.js');
const wallet = require('./wallet');

const bot = new Discord.Client();

bot.once('ready', () => {
console.log('Bot is online!');
});

bot.on('message', async (message) => {
if (message.author.bot) return;
if (!message.guild) return;

const args = message.content.split(' ');
const command = args.shift().toLowerCase();

if (command === '!balance') {
const address = args[0];
const balance = await wallet.getBalance(address);
message.channel.send(`Balance: ${balance} ${wallet.symbol}`);
}

if (command === '!send') {
const address = args[0];
const amount = args[1];
await wallet.send(address, amount);
message.channel.send(`Sent ${amount} ${wallet.symbol} to ${address}`);
}

if (command === '!receive') {
const address = args[0];
const amount = args[1];
await wallet.receive(address, amount);
message.channel.send(`Received ${amount} ${wallet.symbol} from ${address}`);
}
});

bot.login('YOUR_DISCORD_BOT_TOKEN');

// wallet.js

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

const walletAddress = '0x...';
const walletPrivateKey = '0x...';

const wallet = {
symbol: 'ETH',
getBalance: async (address) => {
const balance = await web3.eth.getBalance(address);
return balance.toString();
},
send: async (address, amount) => {
const txCount = await web3.eth.getTransactionCount(walletAddress);
const tx = {
from: walletAddress,
to: address,
value: amount,
gas: '20000',
gasPrice: '20',
nonce: txCount,
};
const signedTx = await web3.eth.accounts.signTransaction(tx, walletPrivateKey);
const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
return receipt;
},
receive: async (address, amount) => {
// TO DO: implement receive functionality
},
};

module.exports = wallet;
