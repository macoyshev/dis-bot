const unavailableRoles = ['@everyone', 'MAC-0.1']

module.exports.run = (client, message, args, prefix) => {
    
    if (!message.guild) {
        message.channel.send('Role can be set only in guild')
        return;
    }

    //get user who send command
    const id = message.author.id
    let user = message.guild.members.cache.get(id)

    let guild_members = new Map()
    let roles_current_guild = new Map()
    let current_guild

    const zero_option = '0'
    let role_to_member
    let role_to_set

    //get map of guild members
    current_guild = message.guild
    current_guild.members.cache.forEach(guildMember => {
        guild_members.set(guildMember.user.username, guildMember) 
    })
    
    //get map of roles
    roles_current_guild.set(zero_option, [])
    current_guild.roles.cache.forEach( role => {
        roles_current_guild.set(role.name, role)
    })
    
    //check if role was specified 
    if (!args[0]){ displayRoles(roles_current_guild, message, zero_option); return}

    //set role_to_set desirable role
    role_to_set = roles_current_guild.get(args[0])
    if (role_to_set === "undefined") {message.channel.send(`The wrong role: ${args[0]}`); return}
    
    //set role_to_member desirable member
    role_to_member = guild_members.get(args[1])  
    if (role_to_member) user = role_to_member
    if (!role_to_member && args[1]) {message.channel.send(`The wrong member: ${args[1]}`); return}
    
    //set role
    try {
        user.roles.set([role_to_set])
    } catch (error) {
        message.channel.send('Not permision to set the role')    
    }
   
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

