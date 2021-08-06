const unavailableRoles = ['@everyone', 'MAC-0.1']

module.exports.run = (client, message, args, prefix) => {
    
    //get user who send command
    const id = message.author.id
    let user = message.guild.members.cache.get(id)

    let guild_members = new Map()
    let roles_current_guild = new Map()
    let current_guild

    const role_to_zero = '0'
    let desireble_role_name = args[0]
    let desireble_role_member = args[1]
    let role_to_member
    let role_to_set

    //get map of guild members
    current_guild = message.guild
    current_guild.members.cache.forEach(guildMember => {
        guild_members.set(guildMember.user.username, guildMember) 
    })
    
    //get map of roles
    current_guild.roles.cache.forEach( role => {
        roles_current_guild.set(role.name, role)
    })
    
    //check role specified
    if (!desireble_role_name){ displayRoles(roles_current_guild, message, role_to_zero); return}

    role_to_set = [roles_current_guild.get(desireble_role_name)]
    role_to_member = guild_members.get(desireble_role_member)
    
    if (role_to_member) user = role_to_member
    if (role_to_set === "undefined") {message.channel.send(`The wrong role: ${desireble_role_name}`); return}

    if (role_to_set === role_to_zero) user.roles.set([])
    else user.roles.set([role_to_set])

    console.log(user);
}

module.exports.help = {
    name: "role",
    description: "role [desireble role] - display available roles, if you want get role, type this next"
}

async function displayRoles(roles_map, message, role_to_zero){
    let out = "You can use next roles:"
    for (let role of roles_map.keys()){
        if (!unavailableRoles.includes(role) && role !== role_to_zero)
            out += '\n\t' + role 
    }

    await message.channel.send(out)
}

