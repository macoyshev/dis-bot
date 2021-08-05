const fs = require('fs');
const { nextTick } = require('process');
const config = require('../config.json')

module.exports.run = (client, message, args, prefix) => {
    fs.readdir('./commands', async (err, files) => {
        if (err) console.log(err);
        let res = "You can use next commands :"

        files.forEach(file => {
            let props = require(`./${file}`) // get executive file\
            
            if (props.help.name === "commands") return

            res += '\n\t' + config.prefix + `${props.help.name}`
        })

        await message.channel.send(res)
    })
}

module.exports.help = {
    name: "commands",
    description: "display all available commands"
}