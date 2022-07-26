const { createImageWithDate } = require('./image.service')

module.exports = {
    validateDateFormat: async (date, ctx) => {
try {
    const regexp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(regexp)) {
        await ctx.reply(`Ви ввели невірний формат дати!
Спробуйте будь ласка ще раз ☝️
Запити діють лише з початку березня 2022 року
`)
    }
    let dateStartWar = new Date('2022-03-01')
    let dateRequest = new Date(date)
    if (date.match(regexp) && dateRequest > dateStartWar) {

        setTimeout(() => {
            createImageWithDate(date, ctx)
        }, 1000)
    }
    if (dateRequest < dateStartWar) {
        ctx.reply('Початкова дата : 2022-03-01')
    }
} catch (er) {
    console.log(er);
}

    }
}
