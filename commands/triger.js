const easyvk = require('easyvk') // Подключаем easyvk
const peer_id = "383100930"
let message_content = 'just ping'



module.exports.run = (client, message, args)=> {
    easyvk({ /** Авторизуемся */
        username: process.env.VK_LOGIN,
        password: process.env.VK_PASSWORD
    }).then((vk) => {
        
        if (args){
            message_content = ''
            args.forEach(arg => {
                message_content += arg
            })
        }

        vk.call('messages.send', {
            peer_id: peer_id,
            message: message_content,
            random_id: easyvk.randomId()
        })

    })
}    


module.exports.help = {
    name: "trigLeha",
    description: "nothing here"
}