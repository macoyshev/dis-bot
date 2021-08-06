const fs = require('fs')

module.exports.run = (client, message) => {
   let out = "help\n"
   
   commandsInfo.forEach((value, key) =>{
       if (key && value) out += `\n${key} : ${value}\n`
   })
   message.channel.send(out)
}

module.exports.help = {
    name: "help"
}