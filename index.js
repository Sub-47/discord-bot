require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Log deleted messages
client.on('messageDelete', message => {
    if (message.partial || message.author.bot) return; // ignore uncached messages or bots
    message.channel.send(`🗑️ **Deleted message by ${message.author.tag}:**\n> ${message.content}`);
});

// Log edited messages
client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.partial || oldMessage.author.bot) return; // ignore uncached messages or bots
    if (oldMessage.content === newMessage.content) return; // ignore edits without content change
    newMessage.channel.send(`✏️ **Edited message by ${oldMessage.author.tag}:**\n> Before: ${oldMessage.content}\n> After: ${newMessage.content}`);
});


client.login(process.env.DISCORD_TOKEN);
