const fs = require("fs")
const config = require("../config.js");
const { EmbedBuilder, InteractionType } = require('discord.js');
const db = require("croxydb")

module.exports = async (client, interaction) => {
    if (!interaction.guild) return;
    if (interaction.type === InteractionType.ApplicationCommand) {
        fs.readdir(config.commandsDir, (err, files) => {
            if (err) throw err;
            files.forEach(async (f) => {
                let props = require(`.${config.commandsDir}/${f}`);
                if (interaction.commandName.toLowerCase() === props.name.toLowerCase()) {
                    try {
                        if (interaction.member.permissions.has(props?.permissions || "0x0000000000000800")) {
                            const DJ = client.config.opt.DJ;
                            if (props && DJ.commands.includes(interaction.commandName)) {
                                let djRole = await db.get(`dj-${interaction.guild.id}`)
                                if (djRole) {
                                    const roleDJ = interaction.guild.roles.cache.get(djRole)
                                    if (!interaction.member.permissions.has("0x0000000000000020")) {
                                        if (roleDJ) {
                                            if (!interaction.member.roles.cache.has(roleDJ.id)) {

                                                const embed = new EmbedBuilder()
                                                    .setColor('007fff')
                                                    .setTitle(client.user.username)
                                                    .setThumbnail(client.user.displayAvatarURL())
                                                    .setDescription("Mày phải có role <@&" + djRole + ">(DJ) mới dùng được lệnh này và các lệnh sau:  " + client.config.opt.DJ.commands.map(astra => '`' + astra + '`').join(", "))
                                                    .setTimestamp()
                                                    .setFooter({text: `Meo!`, iconURL: 'https://cdn.discordapp.com/emojis/1033976452040900669.gif'})
                                                return interaction.reply({ embeds: [embed], ephemeral: true }).catch(e => { })
                                            }
                                        }
                                    }
                                }
                            }
                            if (props && props.voiceChannel) {
                                if (!interaction.member.voice.channelId) return interaction.reply({ content: `⚠️ Bạn cần ở trong kênh thoại để dùng lệnh này!`, ephemeral: true }).catch(e => { })
                                const guild_me = interaction.guild.members.cache.get(client.user.id);
                                if (guild_me.voice.channelId) {
                                    if (guild_me.voice.channelId !== interaction.member.voice.channelId) {
                                        return interaction.reply({ content: `⚠️ Bạn cần ở cùng kênh thoại với bot để dùng lệnh này!`, ephemeral: true }).catch(e => { })
                                    }
                                }
                            }
                            return props.run(client, interaction);

                        } else {
                            return interaction.reply({ content: `Missing permission: **${props?.permissions}**`, ephemeral: true });
                        }
                    } catch (e) {
                        console.log(e);
                        return interaction.reply({ content: `Something went wrong...\n\n\`\`\`${e.message}\`\`\``, ephemeral: true });
                    }
                }
            });
        });
    }

    if (interaction.type === InteractionType.MessageComponent) {
        const queue = client.player.getQueue(interaction.guildId);
        switch (interaction.customId) {
            case 'saveTrack': {
                if (!queue || !queue.playing) {
                    return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, embeds: [], components: [], ephemeral: true }).catch(e => { })
                } else {
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
                        .setFooter({text: `Meo!`, iconURL: 'https://cdn.discordapp.com/emojis/1033976452040900669.gif'})
                    interaction.member.send({ embeds: [embed] }).then(() => {
                        return interaction.reply({ content: `✅ Đã inbox vùng kín!`, embeds: [], components: [], ephemeral: true }).catch(e => { })
                    }).catch(error => {
                        return interaction.reply({ content: `⚠️ Đéo inbox được OK?`, embeds: [], components: [], ephemeral: true }).catch(e => { })
                    });
                }
            }
                break
            case 'time': {
                if (!queue || !queue.playing) {
                    return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, embeds: [], components: [], ephemeral: true }).catch(e => { })
                } else {

                    const progress = queue.createProgressBar();
                    const timestamp = queue.getPlayerTimestamp();

                    if (timestamp.progress == 'Infinity') return interaction.message.edit({ content: `🎦 Bài hát này hiện đang livestream, tạm không thể hiển thị thời lượng.`, embeds: [], components: [] }).catch(e => { })

                    const embed = new EmbedBuilder()
                        .setColor('007fff')
                        .setTitle(queue.current.title)
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTimestamp()
                        .setDescription(`${progress} (**${timestamp.progress}**%)`)
                        .setFooter({text: `Meo!`, iconURL: 'https://cdn.discordapp.com/emojis/1033976452040900669.gif'})
                    interaction.message.edit({ embeds: [embed] }).catch(e => { })
                    interaction.reply({ content: `✅ Xong!`, embeds: [], components: [], ephemeral: true }).catch(e => { })
                }
            }
        }
    }

}
