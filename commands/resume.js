module.exports = {
    name: "resume",
    description: "Tiếp tục phát.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply({ content: `⚠️ Hiện không phát bài hát nào!`, ephemeral: true }).catch(e => { })

        const success = queue.setPaused(false);
        if (success) return interaction.reply({ content: `✅ Xong!` }).catch(e => { })

        //return interaction.reply({ content: success ? `**${queue.current.title}**, The song continues to play. ✅` : `Something went wrong. ⚠️ It's like you haven't stopped the music before.` }).catch(e => { })
    },
};
