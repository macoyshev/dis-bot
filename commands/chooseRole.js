const unavailableRoles = ['@everyone', 'MAC-0.1']

module.exports.run = (client, message, args, prefix) => {
    
    //get user who send command
    const id = message.author.id
    const user = message.guild.members.cache.get(id)
    
    
    message.guild.members.fetch()
        .then(members => {
            let guild_members = new Map() 

            members.forEach(member => {
                guild_members.set(member.user.username, member.user)
            })
        })
        .catch()

    message.guild.roles.fetch()
        .then(roles => {
            let roles_map = new Map()
            
            //define map to easly find credit role
            roles.cache.forEach(role => {
                roles_map.set(role.name, role)
            })
            if (!args[0]){
                displayRoles(roles_map, message)
                return;
            }

            try {
                let role = roles_map.get(args[0])

                if (!role) {
                    message.channel.send(`Wrong role was typed : ${args[0]} does not exit`)
                    throw TypeError("Undefined")
                }
                
                user.roles.set([role])

            } catch (error) {
                console.log(error);
            }
        }) 
        .catch(console.error);
}

module.exports.help = {
    name: "role",
    description: "role [desireble role] - display available roles, if you want get role, type this next"
}

async function displayRoles(roles_map, message){
    let out = "You can use next roles:"
    for (let role of roles_map.keys()){
        if (!unavailableRoles.includes(role))
            out += '\n\t' + role 
    }

    await message.channel.send(out)
}