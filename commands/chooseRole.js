const unavailableRoles = ['@everyone', 'MAC-0.1']

module.exports.run = (client, message, args, prefix) => {
    
    //get user who send command
    const id = message.author.id
    let user = message.guild.members.cache.get(id)
    console.log(user);
    let guild_members = new Map()
    let current_guild

    //get map of guild members
    current_guild = message.guild
    current_guild.members.cache.forEach(guildMember => {
        guild_members.set(guildMember.user.username, guildMember) 
    })
    

    //work with role change
    message.guild.roles.fetch()
        .then(roles => {
            let roles_map = new Map()
            let member_name
            
            //define map to easly find credit role
            roles.cache.forEach(role => {
                roles_map.set(role.name, role)
            })

            if (!args[0]){
                displayRoles(roles_map, message)
                return;
            }
            
            if (args[1]){
                if (guild_members.get(args[1])) {
                    member_name = args[1]
                }else {
                    message.channel.send(`${member_name} is not guild member`)
                    return    
                }
                user = guild_members.get(member_name)
                console.log(user);
            }

            //set role to the user
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
