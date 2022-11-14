const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
  name: "filter",
  description: "Thêm bộ lọc cho bài hát.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'filtre',
    description: 'Hãy chọn bộ lọc bạn muốn. (bassboost, 8D, nightcore, mono, karaoke)',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client, interaction) => {

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })
    const filtre = interaction.options.getString('filtre')

    //if (!filtre) return interaction.reply({ content: `Please enter a valid filter name. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })


    const filters = ["bassboost", "8D", "nightcore", "mono", "karaoke"];
    //other filters: https://discord-player.js.org/docs/main/master/typedef/AudioFilters 

    const filter = filters.find((x) => x.toLowerCase() === filtre.toLowerCase());

    if (!filter) return interaction.reply({ content: `Chỉ hỗ trợ các bộ lọc sau: ❌\n\`bassboost, 8D, nightcore, mono, karaoke\``, ephemeral: true }).catch(e => { })
    const filtersUpdated = {};
    filtersUpdated[filter] = queue["_activeFilters"].includes(filter) ? false : true;
    await queue.setFilters(filtersUpdated);

    const embed = new EmbedBuilder()
      .setTitle(`**Đã ${queue["_activeFilters"].includes(filter) ? 'bật' : 'tắt'} bộ lọc:** ${filter}`)
      //.setDescription('Lưu ý: Nếu ')
      .setColor(0x00AE86)
      .setTimestamp()
    interaction.reply({embeds: [embed]}).catch(e => { })
  },
};
