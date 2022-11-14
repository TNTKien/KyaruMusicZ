const { ApplicationCommandOptionType } = require('discord.js');
const maxVol = require("../config.js").opt.maxVol;
module.exports = {
    name: "volume",
    description: "Điều chỉnh âm lượng.",
    permissions: "0x0000000000000800",
    options: [{
        name: 'volume',
        description: 'Âm lượng mong muốn [1 - 100].',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: async (client, interaction) => {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        const vol = parseInt(interaction.options.getInteger('volume'));

        //if (!vol) return interaction.reply({ content: `Current volume: **${queue.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVol}\` Type a number between.**`, ephemeral: true }).catch(e => { })

        if (queue.volume === vol) return interaction.reply({ content: `⚠️ Âm lượng hiện tại đã là ${vol} rồi!`, ephemeral: true }).catch(e => { })

        if (vol < 0 || vol > maxVol) return interaction.reply({ content: `⚠️ Âm lượng phải thuộc đoạn [1 - 100]`, ephemeral: true }).catch(e => { })

        const success = queue.setVolume(vol)
        if (success) return interaction.editReply({ content: `🔊 Âm lượng đã được thay đổi thành ${vol}%!`, ephemeral: true }).catch(e => { })
        else return interaction.editReply({ content: `⚠️ Đã xảy ra lỗi!`, ephemeral: true }).catch(e => { })

        // .then(() => {
        //     interaction.editReply({ content: `🔊 Âm lượng đã được thay đổi thành ${vol}%!`, ephemeral: true }).catch(e => { })
        // }).catch(e => {
        //     interaction.editReply({ content: `⚠️ Đã xảy ra lỗi!`, ephemeral: true }).catch(e => { })
        // });

        //return interaction.reply({ content: success ? `Volume changed: **${vol}**/**${maxVol}** 🔊` : `Something went wrong. ⚠️` }).catch(e => { })
    },
};
