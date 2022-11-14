module.exports = {
    TOKEN: "",//nhét token vào đây hoặc tạo file .env rồi nhét token vào đó
    ownerID: "", //nhét ID vào đây
    botInvite: "", //nhét link mời bot vào đây
    status: '',
    commandsDir: './commands', //đừng có đụng vào nếu không biết

    opt: {
        DJ: {
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //như trên
        },

        voiceConfig: {
            leaveOnEnd: false, //để "true" nếu muốn bot rời kenh khi hết nhạc
            autoSelfDeaf: false, //để "true" nếu muôn bịt tai bot

            leaveOnTimer: { //Muốn đoạn này chạy được thì leaveOnEnd phải để "false"
                status: true, //để "true" nếu muốn bot rời kênh khi bot offline
                time: 20000, //1000 = 1 second
            }
        },

        maxVol: 100, //đổi thế nào tuỳ ý.
        loopMessage: false,

        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', //cấm sờ
                highWaterMark: 1 << 25 //như trên
            }
        }
    }
}
