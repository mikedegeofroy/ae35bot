const { Telegraf } = require('telegraf')
const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '4557bed5fb3843afb6d99be512588fbb',
    clientSecret: '44023cffa97742408e51babb39e0f58e',
    redirectUri: 'http://127.0.0.1/'
});

spotifyApi.setAccessToken('BQC3I3AQHn8kqwFLRG2eCSn1yHj0-CGMuF4bM087Qtf-CjI2og_rlHzL7EETH2rym6yxpYsWRTFF2Zccfq5WqIaLjW2QIw6h6cv9TH6agNHZwJrm0WBq41Jgv19WSPNSJdnX8UBdEuAIi9ruWeJm9M8WW8Vjx-LRNe3krOzUz1q35m6ds2sdLSRhPEjMLoRe9ATSD3KSg7hu4wB3XShE-at41e7V6Q--fG8VJDgraDtNXaMnBIhO4ZZV')

// spotifyApi.setCredentials({
//     accessToken: 'myAccessToken',
//     refreshToken: 'myRefreshToken',
//     redirectUri: 'http://www.example.com/test-callback',
//     clientId: 'myClientId',
//     clientSecret: 'myClientSecret'
// });

const bot = new Telegraf('5265894081:AAGMMVP-xFeWT-Z-VLqXrpIXbwLf3McZSHU')

// bot.command('hipster', Telegraf.reply('λ'))

bot.use((ctx) => {
    // console.log(ctx.update)
    let channel_id = '914438292'

    bot.telegram.sendMessage(channel_id, "Currently playing:")

    spotifyApi.getMyCurrentPlayingTrack().then( (data) => {

        let currentlyPlaying = data.body.item


        console.log(currentlyPlaying)

        bot.telegram.sendPhoto(channel_id, currentlyPlaying.album.images[0])

        bot.telegram.sendMessage(channel_id, `${currentlyPlaying.artists[0].name} - ${currentlyPlaying.name}`, { reply_markup: JSON.stringify({ inline_keyboard: [[{ text: 'Open in Spotify', url: currentlyPlaying.external_urls.spotify }, { text: '👍', callback_data: 'like' }]] }) })

        bot.telegram.sendAudio(channel_id, currentlyPlaying.preview_url)
    
        // bot.telegram.sendVideoNote('-1001758725763', currentlyPlaying.preview_url)
    
        // bot.telegram.sendAudio('-1001758725763', currentlyPlaying.preview_url, { caption: `${currentlyPlaying.name} - ${currentlyPlaying.artists[0].name}` })
    
        // bot.telegram.sendMediaGroup('-1001758725763', currentlyPlaying.preview_url)
    
        // bot.telegram.sendMessage('-1001758725763', currentlyPlaying.name).then( (res) => {
        //     console.log(res)
        // })
    })
})

// bot.telegram.sendMessage('-1001758725763', spotifyApi.getMyCurrentPlayingTrack()).then( (res) => {
//     console.log(res)
// })

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
