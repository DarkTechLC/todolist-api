const db = require('../../config/database');

module.exports = async (req, res) => {
  const { userId } = req;

  const user = {
    username: null,
    email: null,
  }

  try {
    const userResult = await db.query(`
      SELECT username, email FROM users WHERE id = '${userId}';
    `, []);

    const { username, email } = userResult.rows[0];

    user.username = username;
    user.email = email;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not get user data.'
    });
  }

  return res.status(200).json({
    error: false,
    auth: true,
    user_name: user.username,
    user_email: user.email,
  });
}