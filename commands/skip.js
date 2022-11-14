module.exports = {
    name: "skip",
    description: "Bỏ qua bài hát hiện tại.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        const success = queue.skip();

        return interaction.reply({ content: success ? `✅ Đã bỏ qua!` : `⚠️ Lỗi!` }).catch(e => { })
    },
};
