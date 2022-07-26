const User = require('../db/models/userModel');
module.exports = {
    createIfNotExist: async (user) => {
try {
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
} catch (er) {
    console.log(er);
}
    }
}