const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "play",
    description: "Phát bài hát yêu thích của bạn.",
    permissions: "0x0000000000000800",
    options: [{
        name: 'song',
        description: 'Tên bài hát hoặc link youtube.',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    voiceChannel: true,
    run: async (client, interaction) => {
        await interaction.deferReply();
        const name = interaction.options.getString('song')
        //if (!name) return interaction.reply({ content: `Write the name of the music you want to search. ⚠️`, ephemeral: true }).catch(e => { })

        const res = await client.player.search(name, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return interaction.editReply({ content: `⚠️ Không tìm thấy kết quả nào!`, ephemeral: true }).catch(e => { })

        const queue = await client.player.createQueue(interaction.guild, {
            leaveOnEnd: client.config.opt.voiceConfig.leaveOnEnd,
            autoSelfDeaf: client.config.opt.voiceConfig.autoSelfDeaf,
            metadata: interaction.channel
        });

        try {
            if (!queue.playing) await queue.connect(interaction.member.voice.channelId)
        } catch {
            await client.player.deleteQueue(interaction.guild.id);
            return interaction.editReply({ content: `⚠️ Bot không thể vào kênh thoại!`, ephemeral: true }).catch(e => { })
        }

        await interaction.editReply({ content: `Đang tải nhạc<a:loading:984398540031815700> ` }).catch(e => { })
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.playing) await queue.play()
        await interaction.editReply({ content: `_ _` }).catch(e => { })
    },
};
