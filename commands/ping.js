const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client,message,args,prefix) => {
    const ping = new Date(message.createdTimestamp);
    const timeTaken = Date.now() - message.createdTimestamp;
  
	message.channel.send(`Ping: ${timeTaken}ms`);

};
module.exports.help = {
    name: "ping",
    description: "display your ping"
};