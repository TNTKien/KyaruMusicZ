module.exports = {
    name: "back",
    description: "Phát lại bài hát trước.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        if (!queue.previousTracks[1]) return interaction.reply({ content: `⚠️ Hiện chưa phát bài hát nào!`, ephemeral: true }).catch(e => { })

        await queue.back();

        interaction.reply({ content: `Đang phát lại <a:loading:984398540031815700> ` }).catch(e => { })
    },
};
