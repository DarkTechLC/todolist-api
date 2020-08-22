const bcrypt = require('bcrypt');

const comparePassword = async (plainTextPassword, hash) => {
  try {
    const match = await bcrypt.compare(plainTextPassword, hash);
    return match;
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = comparePassword;