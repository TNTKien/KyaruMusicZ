const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Colors } = require("discord.js")
const config = require("../config.js");
module.exports = {
  name: "statistic",
  description: "View your bot statistics.",
  options: [],
  run: async (client, interaction) => {

    let link_button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Refresh')
        .setStyle(ButtonStyle.Success)
        .setCustomId("Refresh"))


    const embed = new EmbedBuilder()
      .setTitle("Vài thông tin của "+client.user.username)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription('Code ăn cắp trên Github về rồi sửa thành của mình <:tu:918158175713259562>\nAi cũng muốn ăn cắp thì xem tại [đây](https://github.com/TNTKien/KyaruMusic)')
      .addFields(
        { name: 'Discord.js', value: `V14.1.0`, inline: true },
        { name: 'Node.js', value: `${process.version}`, inline: true },
        { name: 'Operation Time:', value: `<t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>`, inline: true },
        { name: 'Ping:', value: `${client.ws.ping} ms`, inline: true },
        { name: 'Memory Usage:', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: 'OS:', value: `${process.platform}`, inline: true },
        { name: 'Owner:', value: `${client.users.cache.get(config.ownerID)?.tag}`, inline: true },
        { name: 'Invite Bot:', value: `[CLICK](${config.botInvite})`, inline: true }
      )
      .setColor(Colors.Green)
      .setTimestamp()
    return interaction.reply({ embeds: [embed]}).then(async Message => {

      const filter = i => i.user.id === interaction.user.id
      let col = await interaction.channel.createMessageComponentCollector({ filter, time: 120000 })

      col.on('collect', async (button) => {
        switch (button.customId) {
          case 'Refresh': {
            const embed2 = new EmbedBuilder()
              .setTitle(client.user.username + " Bot Statistics")
              .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
              .setDescription(`**
• Owner: \`${client.users.cache.get(config.ownerID)?.tag || "Bulunamadı!"}\`
• Developer: \`Umut#6070\`

• User Count: \`${client.users.cache.size}\`
• Server Count: \`${client.guilds.cache.size}\`
• Channel Count: \`${client.channels.cache.size}\`
• Command Count: \`${client.commands.map(c => c.name).length}\`
• Discord.js Version: \`V14.1.0\`
• Node.js Version: \`${process.version}\`
• Operation Time: <t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>
• Ping: \`${client.ws.ping} MS\`
• Memory Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
• OS: \`${process.platform}\`
• Invite Bot: [Click](${config.botInvite})
**`)
              .setColor(Colors.Green)
              .setTimestamp()
            await interaction.editReply({ content: "**✔️ Data Updated.**", embeds: [embed2] }).catch(err => { })
            await button.deferUpdate().catch(e => { })
          }
        }
      })
      col.on('end', async (button) => {
        link_button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Refresh')
            .setStyle(ButtonStyle.Success)
            .setCustomId("Refresh")
            .setDisabled(true))
        return interaction.editReply({ content: "**Your Time Ended!**", components: [link_button] }).catch(err => { })
      })
    }).catch(err => { })
  },
};
