const Discord = require('discord.js')
const fs = require('fs')
const fetch = require('node-fetch')
const config = require('./config.json')
const client = new Discord.Client();

client.commands = new Discord.Collection()
global.commandsInfo = new Map()


fs.readdir('./commands', function(err, files){
    if (err) console.log(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js')

    if (jsfiles.length <= 0 ) return console.log("commands not found")

    console.log(`Was(were)loaded ${jsfiles.length} command(s)`)

    jsfiles.forEach((file, index)=>{
        let props = require(`./commands/${file}`)
        
        commandsInfo.set(props.help.name, props.help.description)
        client.commands.set(props.help.name, props)
    })
})

client.on("message", (message) => {
    let prefix = config.prefix

    if (!message.content.startsWith(prefix) || message.author.bot) return;


    let messageArray = message.content.split(' ')
    let command = messageArray[0]
    let args = messageArray.slice(1)

    let command_file = client.commands.get(command.slice(prefix.length))
    if (command_file) command_file.run(client, message, args, prefix)
})


client.login(process.env.TOKEN)
//client.login(config.BOT_TOKEN)