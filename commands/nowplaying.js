const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "nowplaying",
    description: "Xem thông tin bài hát đang phát.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        const track = queue.current;

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setThumbnail(track.thumbnail)
            .setTitle(track.title)
            .setURL(track.url)

        const methods = ['disabled', 'track', 'queue'];
        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        //embed.setDescription(`Audio **%${queue.volume}**\nDuration **${trackDuration}**\nURL: ${track.url}\nLoop Mode **${methods[queue.repeatMode]}**\n${track.requestedBy}`);

        embed.addFields(
            { name: 'Âm lượng:', value: `${queue.volume}%`, inline: true },
            //{ name: 'Phát lại:', value: `${methods[queue.repeatMode]}`, inline: true },
            { name: 'Yêu cầu bởi:', value: `${track.requestedBy}`, inline: true }
        )
        if(timestamp.progress != 'Infinity')
            embed.addFields({ name: 'Thời lượng:', value: `${progress} (**${timestamp.progress}**%)`, inline: false })

        embed.setTimestamp();
       

        const saveButton = new ButtonBuilder();
        saveButton.setLabel('Save Song');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(saveButton);

        interaction.reply({ embeds: [embed], components: [row] }).catch(e => { })
    },
};
