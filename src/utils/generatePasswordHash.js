const bcrypt = require('bcrypt');

const generatePasswordHash = async (plainTextPassword, saltRounds = 10) => {
  try {
    const passwordHashed = await bcrypt.hash(plainTextPassword, saltRounds);
    return passwordHashed;
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = generatePasswordHash;