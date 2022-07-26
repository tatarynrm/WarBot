module.exports = {
    todayDate: () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear();
        const dateString = year + "-" + ((month + 1) < 10 ? "0" + (month + 1) : (month + 1)) + "-" + day;
        return dateString
    }

}