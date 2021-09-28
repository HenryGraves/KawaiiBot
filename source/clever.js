/**
 * @name clever
 * @description     A clever bot API implementation!
 * @date 5/21/21
 */
 require('dotenv').config()
 const Cleverbot        = require('cleverbot-node')
 const emoji            = require('emoji-random')
 const randomInt        = require('./random')
 const filterMentions   = require('./filterMentions')
 cleverbot = new Cleverbot();
 cleverbot.configure({botapi: process.env.CLEVERBOT_API_KEY});
 
module.exports = clever = (event, type) => {
    event.content = filterMentions(event.content)
    cleverbot.write(event.content, (response) => {
        if (type == "dm") {
            if (event.content.includes('new') && event.content.includes('world') && event.content.includes('role')) {
                event.author.send('New world role added! Have fun!')
            } else {
                event.author.send(
                    randomInt(100) < 50 ? response.output += ` ${emoji.random()}` : response.output
                ).catch()
            }
        } else {
            event.channel.send(
                randomInt(100) < 50 ? response.output += ` ${emoji.random()}` : response.output
            )
        }
        
    })
}