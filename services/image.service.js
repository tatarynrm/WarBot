const axios = require('axios');
const { loadImage, createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path')
module.exports = {
    createImageWithDate: async (date, ctx) => {
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
    },
    createImageWithToday: async (ctx) => {
        const res = await axios(`https://russianwarship.rip/api/v1/statistics/latest`)
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
}