function checkDate(dateString) {
    return !isNaN(Date.parse(dateString));
}

module.exports = { checkDate };
