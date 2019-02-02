const {
    Client
} = require('discord.js');

const {
    log,
    error
} = require('./utils/funcs.js');

class Stats {
    constructor(token, options = {}, names = {}) {
        this.token = token;
        this.options = options;
        this.names = names;

        /**
         * Checks for IDs.
         */

        if (!this.options.guildID) throw new Error('guildID was not provided.');
        if (!this.options.totalChannel) throw new Error('totalChannel was not provided.');
        if (!this.options.usersChannel) throw new Error('usersChannel was not provided.');
        if (!this.options.botsChannel) throw new Error('botsChannel was not provided.');

        /**
         * The main part.
         */

        const client = new Client({
            fetchAllMembers: true
        });

        client.on('ready', async () => {
            if (client.guilds.size < 1) {
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
            /**
             * Getting the users.
             */
            const totalN = this.names.total.replace('{totalMembers}', member.guild.members.size) || '👥 Total Members: ' + member.guild.members.size + '';
            const usersN = this.names.users.replace('{users}', member.guild.members.filter(u => !u.user.bot).size) || '👥 Total Users: ' + member.guild.members.filter(u => !u.user.bot).size + '';
            const botsN = this.names.bots.replace('{bots}', member.guild.members.filter(u => u.user.bot).size) || '🤖 Total Bots: ' + member.guild.members.filter(u => u.user.bot).size + '';

            if (member.guild.id !== this.options.guildID) throw new Error('The bot is in multiple servers or you set the guildID wrong. Please update.');

            try {
                member.guild.channels.get(this.options.totalChannel).setName(totalN);
                member.guild.channels.get(this.options.usersChannel).setName(usersN);
                member.guild.channels.get(this.options.botsChannel).setName(botsN);
                log(member.user.tag + ' joined and the channels were updated.');
            } catch (err) {
                error(err.message);
                process.exit();
            }
        });

        client.on('guildMemberRemove', member => {
            /**
             * Getting the users.
             */
            const totalN = this.names.total.replace('{totalMembers}', member.guild.members.size) || '👥 Total Members: ' + member.guild.members.size + '';
            const usersN = this.names.users.replace('{users}', member.guild.members.filter(u => !u.user.bot).size) || '👥 Total Users: ' + member.guild.members.filter(u => !u.user.bot).size + '';
            const botsN = this.names.bots.replace('{bots}', member.guild.members.filter(u => u.user.bot).size) || '🤖 Total Bots: ' + member.guild.members.filter(u => u.user.bot).size + '';

            if (member.guild.id !== this.options.guildID) throw new Error('The bot is in multiple servers or you set the guildID wrong. Please update.');

            try {
                member.guild.channels.get(this.options.totalChannel).setName(totalN);
                member.guild.channels.get(this.options.usersChannel).setName(usersN);
                member.guild.channels.get(this.options.botsChannel).setName(botsN);
                log(member.user.tag + ' left and the channels were updated.');
            } catch (err) {
                error(err.message);
            }
        });

        /**    
         * Connect to discord.
         */
        client.login(this.token).catch(err => error('An error occured. ' + err.message));
    }
}

module.exports = Stats;