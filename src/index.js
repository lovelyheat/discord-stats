const { Client } = require('discord.js');
const { log, error } = require('./utils/funcs.js');
 
class Stats {
    constructor(token, options = {}) {
        this.token = token;
        this.options = options;

        /**
         * Checks for values.
         */

        if(!this.options.guildID) throw new Error('guildID was not provided.');
        if(!this.options.totalChannel) throw new Error('totalChannel was not provided.');
        if(!this.options.usersChannel) throw new Error('usersChannel was not provided.');
        if(!this.options.botsChannel) throw new Error('botsChannel was not provided.');

        /**
         * The main part.
         */

         const client = new Client({ fetchAllMembers: true });

         client.on('ready', async () => {
            if(client.guilds.size < 1) {
                error('Looks like the bot is not in a server, here is a invite: ' + await client.generateInvite());
                process.exit();
            } else {
                log('Bot successfully logged in as ' + client.user.tag + ', ' + client.user.id);
            }
         });

         /**
          * The channels update part.
          */

         client.on('guildMemberAdd', member => {
            let totalMembers = 0;
            let users = 0;
            let bots = 0;

            member.guild.members.forEach(u => { 
                totalMembers += 1;
                if(u.user.bot) {
                    bots += 1;
                } else {
                    users += 1;
                }
            });

            if(member.guild.id !== this.options.guildID) throw new Error('The bot is in multiple servers or you set the guildID wrong. Please update.');

            try {
                member.guild.channels.get(this.options.totalChannel).setName('👥 Total Members: ' + totalMembers);
                member.guild.channels.get(this.options.usersChannel).setName('👥 Total Users: ' + users);
                member.guild.channels.get(this.options.botsChannel).setName('🤖 Total Bots: ' + bots);
            } catch(err) {
                error(err.message);
            }

         });

         /**    
          * Connect to discord.
          */

         try {
            client.login(this.token);
         } catch(err) {
            error(err.message);
         }
    }
}

module.exports = Stats;