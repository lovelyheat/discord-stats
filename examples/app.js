const discordStats = require('../index');
var token = 'Your Bot Token';

const client = new discordStats(token, {
    guildID: '539088655000535059',
    totalChannel: '541303639285825537',
    usersChannel: '541303650375696389',
    botsChannel:  '541303676057157649',
}, {
   total: 'Total Members: {totalMembers}',
   users: 'Total Users: {users}',
   bots: 'Total Bots: {bots}',
});