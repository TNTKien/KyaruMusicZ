const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "save",
    description: "Lưu bài hát đang phát.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(queue.current.title)
            .setURL(queue.current.url)
            .setThumbnail(queue.current.thumbnail)
            .addFields([
                { name: `Author:`, value: queue.current.author, inline: true },
                { name: `Thời lượng:`, value: queue.current.duration, inline: true },
                //{ name: `URL`, value: `${queue.current.url}` },
                //{ name: `Saved Server`, value: `\`${interaction.guild.name}\`` },
                { name: `Yêu cầu bởi:`, value: `${queue.current.requestedBy}`, inline: true }
            ])
            .setTimestamp()
            //.setFooter({ text: `Code Share - by Umut Bayraktar ❤️` })
        interaction.user.send({ embeds: [embed] }).then(() => {
            interaction.reply({ content: `✅ Đã inbox vùng kín!`, ephemeral: true }).catch(e => { })
        }).catch(error => {
            interaction.reply({ content: `⚠️ Lỗi`, ephemeral: true }).catch(e => { })
        });
    },
};
