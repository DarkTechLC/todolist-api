const { randomBytes } = require('crypto');

const generateID = (size = 4) => randomBytes(size).toString('hex');

module.exports = generateID;
