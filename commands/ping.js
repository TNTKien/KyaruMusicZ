const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "ping",
    description: "pong!",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const start = Date.now();
        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username + " - Pong!")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: `Message Ping`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `Message Latency`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `API Latency`, value: `\`${Math.round(client.ws.ping)}ms\` 🛰️` }
            ])
            .setTimestamp()
            .setFooter({text: `Meo!`, iconURL: 'https://cdn.discordapp.com/emojis/1033976452040900669.gif'})
        interaction.reply({ embeds: [embed] }).catch(e => { });

    },
};
