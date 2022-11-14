const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "help",
    description: "Xem danh sách các lệnh có thể dùng.",
    permissions: "0x0000000000000800",
    options: [],
    showHelp: false,
    run: async (client, interaction) => {

        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Code ăn cắp trên Github về rồi sửa thành của mình <:tu:918158175713259562>\nAi cũng muốn ăn cắp thì xem tại [đây](https://github.com/TNTKien/KyaruMusic)")
            .addFields([
                { name: `Các lệnh hiện có:`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }
            ])
            .setTimestamp()
            .setFooter({text: `Meo!`, iconURL: 'https://cdn.discordapp.com/emojis/1033976452040900669.gif'})
        interaction.reply({ embeds: [embed] }).catch(e => { })
    },
};
