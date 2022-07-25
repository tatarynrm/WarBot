const { Telegraf } = require('telegraf')
const fs = require('fs')
const axios = require('axios')
const { loadImage, createCanvas } = require('canvas')


const path = require('path')
const User = require('./db/models/userModel')

const sequelize = require('./db/index')
console.log(sequelize);
const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start()

const sendMessage = require('./sendMessage')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const dateUrl = `https://russianwarship.rip/api/v1/statistics/2022-06-25`
const baseUrl = `https://russianwarship.rip/api/v1/statistics/latest`
const result = [];


const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth()
const year = currentDate.getFullYear();
const dateString = year + "-" + ((month + 1) < 10 ? "0" + (month + 1) : (month + 1)) + "-" + day;


bot.start(async (ctx) => {
    const user = ctx.message.from;
    createIfNotExist(user);



    bot.telegram.sendMessage(ctx.chat.id,
        `Привіт ${ctx.message.from.username} 
цей телеграм бот показує статистику втрат рашистів`, {
        reply_markup: {
            keyboard: [
                [
                    { text: `Показати втрати станом на ${dateString}` }

                ],
                [
                    { text: `Показати результати (будь яка дата)` }

                ],
                // [
                //     { text: `Збір коштів на допомогу армії` }

                // ],
                // [
                //     { text: `Дізнатись суму донатів за увесь період` }

                // ]
            ],
            resize_keyboard: true,
        },
    })

})
bot.hears('Дізнатись суму донатів за увесь період', ctx => {
    ctx.reply(`З вашою допомогою,нам вдалося зібрати суму у розмірі : 97944 грн 🥰🥰🥰
Дякуємо усім небайдужим !!!
Дата початку збору донатів : 23.06.2022
`)
})
bot.hears('Показати результати (будь яка дата)', ctx => {
    ctx.reply(`Будь ласка, введіть дату 
у форматі : YYYY-MM-DD  
Наприклад : 2022-07-15
Зверніть увагу,зпити здійснюються 
з початку березня 2022 року`)
})
bot.hears('Збір коштів на допомогу армії', ctx => {
    ctx.replyWithMarkdown(`
Mono Bank : [4441 1144 5242 6750](https://send.monobank.ua/5xUEavwuX9)

-Навіть декілька гривень можуть врятувати життя-
                            ❤️❤️❤️
`)
})
bot.hears(`Показати втрати станом на ${dateString}`, async ctx => {
    console.log(ctx);
    // const dateUrl = `https://russianwarship.rip/api/v1/statistics/${dateString}`

    // ctx.replyWithPhoto({ source: fs.createReadStream('resources/drawnImage.png') })
    const getLatestData = async () => {
        const res = await axios(baseUrl)
        const data = res.data.data;
        const stats = data.stats;
        const width = 1920
        const height = 1080
        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        context.fillStyle = 'white'
        context.fillRect(0, 0, width, height)
        context.font = 'bold 60pt Times New Roman'
        context.textBaseline = 'bottom'
        context.textAlign = 'right'
        // context.fillStyle = 'black'
        const imgText = `
                    ${data.date} ---  ${data.day} день війни

                    Знищено рашистів: ${stats.personnel_units}
                    Танків: ${stats.tanks}
                    Бойових броньованих машин:${stats.armoured_fighting_vehicles}
                    Артилерійських систем:${stats.artillery_systems}
                    Літаків:${stats.planes}
                    Вертольотів:${stats.helicopters}

        `
        const textAlign = context.measureText(imgText).width
        context.fillRect(400 - textAlign / 2 - 10, 1 - 1, textAlign + 20, 120)
        context.fillStyle = '#000'
        context.fillText(imgText, 1500, 10)
        context.fillStyle = '#000'
        context.font = 'bold 32pt Times New Roman'
        context.fillText('@war_ua_bot', 1900, 1060)
        loadImage('./img/samurai.png').then((data) => {
            context.drawImage(data, 150, 750, 350, 350)
            const imgBuffer = canvas.toBuffer('image/png')
            fs.writeFileSync('./resources/drawnImage.png', imgBuffer)
        })
        chatId = '-1001686355435'
        ctx.replyWithPhoto({ source: fs.createReadStream('resources/drawnImage.png') })

    }
    setTimeout(() => {
        getLatestData()
    }, 1000)

})


bot.hears('test1', ctx => {
    setInterval(() => {
        bot.telegram.sendPhoto(Pankivskiy, { source: fs.createReadStream('resources/drawnImage.png') }, {
            caption: 'Сіськииииииииииииииииии'
        })
    }, 2000);
    // sendMessage()
    console.log(ctx);
})
6802

bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    if (validateDateFormat(text, ctx)) {
        let dateStartWar = new Date('2022-03-01')
        let dateRequest = new Date(text)
        if (dateRequest < dateStartWar) {
            ctx.reply('Початкова дата : 2022-03-01')
            return;
        }
        setTimeout(() => {
            createImage(text, ctx)
        }, 1000)
    }



})


async function createIfNotExist(user) {
    const userTgId = user.id.toString()
    const checkUser = await User.findOne({
        where: { userTelegramId: userTgId },
    });
    if (checkUser === null) {
        User.create({
            userTelegramId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            userName: user.username
        });
    }
}

async function validateDateFormat(date, ctx) {
    const regexp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(regexp)) {

        await ctx.reply(`Ви ввели невірний формат дати!
Спробуйте будь ласка ще раз ☝️
Запити діють лише початку березня 2022 року
`)
    }

    if (date.match(regexp)) {
        return true;
    }
    return false;

}
async function createImage(date, ctx) {
    const res = await axios(`https://russianwarship.rip/api/v1/statistics/${date}`)
    const data = res.data.data;
    const stats = data.stats;
    const width = 1920
    const height = 1080
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
    context.font = 'bold 60pt Times New Roman'
    context.textBaseline = 'bottom'
    context.textAlign = 'right'
    // context.fillStyle = 'black'
    const imgText = `
                ${data.date} ---  ${data.day} день війни

                Знищено рашистів: ${stats.personnel_units}
                Танків: ${stats.tanks}
                Бойових броньованих машин:${stats.armoured_fighting_vehicles}
                Артилерійських систем:${stats.artillery_systems}
                Літаків:${stats.planes}
                Вертольотів:${stats.helicopters}

    `
    const textAlign = context.measureText(imgText).width
    context.fillRect(400 - textAlign / 2 - 10, 1 - 1, textAlign + 20, 120)
    context.fillStyle = '#000'
    context.fillText(imgText, 1500, 10)
    context.fillStyle = '#000'
    context.font = 'bold 32pt Times New Roman'
    context.fillText('@war_ua_bot', 1900, 1060)
    loadImage('./img/samurai.png').then((data) => {
        context.drawImage(data, 150, 750, 350, 350)
        const imgBuffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./resources/drawnImage.png', imgBuffer)
    })
    await ctx.replyWithPhoto({ source: fs.createReadStream('resources/drawnImage.png') })
}

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

