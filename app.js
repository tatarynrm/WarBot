const { Telegraf } = require('telegraf')
const fs = require('fs')
const axios = require('axios')
// const { loadImage, createCanvas } = require('canvas')
const path = require('path')
require('dotenv').config()

const User = require('./db/models/userModel')

const { createIfNotExist } = require('./services/user.service.js')
const { validateDateFormat } = require('./services/validation.service.js')
const { createImageWithDate, createImageWithToday } = require('./services/image.service.js')
const { todayDate } = require('./services/date.service')
console.log(todayDate());
const sequelize = require('./db/index')
const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
start()
const bot = new Telegraf(process.env.BOT_TOKEN)



bot.start(async (ctx) => {
    const user = ctx.message.from;

    createIfNotExist(user);
    bot.telegram.sendMessage(ctx.chat.id,
        `Привіт ${ctx.message.from.username} 
цей телеграм бот показує статистику втрат рашистів`, {
        reply_markup: {
            keyboard: [
                [
                    { text: `Показати втрати станом на ${todayDate()}` }

                ],
                [
                    { text: `Показати результати (будь яка дата)` }

                ],
                [
                    { text: `Збір коштів на допомогу армії` }

                ]
            ],
            resize_keyboard: true,
        },
    })

})

bot.hears('Показати результати (будь яка дата)', ctx => {
    ctx.reply(`Будь ласка, введіть дату 
у форматі : YYYY-MM-DD  
Наприклад : 2022-07-15
Зверніть увагу,запити здійснюються 
з початку березня 2022 року`)
})
bot.hears('Збір коштів на допомогу армії', ctx => {
    ctx.replyWithMarkdown(`
Mono Bank : [4441 1144 5242 6750](https://send.monobank.ua/5xUEavwuX9)

-Навіть декілька гривень можуть врятувати життя-
                            ❤️❤️❤️
`)
})
bot.hears(`Показати втрати станом на ${todayDate()}`, async (ctx) => {
    setTimeout(() => {
        createImageWithToday(ctx)
    }, 1000)

})

bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    validateDateFormat(text, ctx)
})


bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

