const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');
module.exports = {
  name: "search",
  description: "Tìm bài hát trên youtube.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'keyword',
    description: 'Từ khoá cần tìm.',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const name = interaction.options.getString('keyword')
    //if (!name) return interaction.reply({ content: `Please enter a valid song name. ⚠️`, ephemeral: true }).catch(e => { })

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

    const embed = new EmbedBuilder();

    embed.setColor('007fff');
    embed.setTitle(`Kết quả cho: ${name}`);

    const maxTracks = res.tracks.slice(0, 10);

    embed.setDescription(`${maxTracks.map((track, i) => `\`${i + 1}\`. [${track.title}](${track.url})\nThời lượng: \`${track.duration}\``).join('\n')}\n\nHãy chọn ID bài muốn phát \`(1-${maxTracks.length})\`, bạn có \`30s\` nhé!`);

    embed.setTimestamp();
    embed//.setFooter({ text: `Code Share - by Umut Bayraktar ❤️` })

    interaction.editReply({ embeds: [embed] }).catch(e => { })

    const collector = interaction.channel.createMessageCollector({
      time: 30000,
      errors: ['time'],
      filter: m => m.author.id === interaction.user.id
    });

    collector.on('collect', async (query) => {
      if (["cancel"].includes(query.content)) {
        embed.setDescription(`Music search cancelled. ✅`)
        await interaction.editReply({ embeds: [embed], ephemeral: true }).catch(e => { })
        return collector.stop();
      }
      const value = parseInt(query.content);

      if (!value || value <= 0 || value > maxTracks.length) return interaction.channel.send({ content: `⚠️ ID lỗi!`, ephemeral: true }).catch(e => { })

      collector.stop();

      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channelId);
      } catch {
        await client.player.deleteQueue(interaction.guild.id);
        return interaction.channel.send({ content: `⚠️ Bot không thể vào kênh thoại!`, ephemeral: true }).catch(e => { })
      }

      await interaction.channel.send({ content: `Đã chọn ID: \`${value}\`` }).catch(e => { })

      queue.addTrack(res.tracks[Number(query.content) - 1]);
      if (!queue.playing) await queue.play();

    });

    collector.on('end', (msg, reason) => {
      if (reason === 'time') return interaction.channel.send({ content: `⚠️ Đã hết thời gian chọn!`, ephemeral: true }).catch(e => { })
    });
  },
};
