module.exports = {
    name: "stop",
    description: "Dừng phát nhạc và đuổi bot ra đường.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        queue.destroy();

        interaction.reply({ content: `Dừng thì dừng không phải đuổi 😏` }).catch(e => { })
    },
};
