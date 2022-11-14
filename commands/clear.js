module.exports = {
    name: "clear",
    description: "Xoá danh sách phát hiện có.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        if (!queue.tracks[0]) return interaction.reply({ content: `⚠️ Danh sách phát trống!`, ephemeral: true }).catch(e => { })

        await queue.clear();

        interaction.reply({ content: `🗑️ Xoá thành công!` }).catch(e => { })
    },
}
