const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "pause",
    description: "Tạm dừng bài hát.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        const success = queue.setPaused(true);
        if (success) {
            const embed = new EmbedBuilder()
                .setColor('007fff')
                .setTitle('▶️ Tạm dừng!')
                .setDescription('Dùng lệnh `/resume` để tiếp tục phát.')
                //.setTimestamp();
            return interaction.reply({ embeds: [embed] }).catch(e => { })
        }
        else
            return interaction.reply({ content: `⚠️ Xảy ra lỗi và tao đéo biết lỗi gì!`, ephemeral: true }).catch(e => { })

        //return interaction.reply({ content: success ? `The currently playing music named **${queue.current.title}** has stopped ✅` : `Something went wrong. ⚠️` }).catch(e => { })
    },
}
