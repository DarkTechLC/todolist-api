const db = require('../../config/database');

module.exports = async (req, res) => {
  const { userId } = req;

  try {
    const { rows: [{ username, email }] } = await db.query(`
      SELECT username, email
      FROM users
      WHERE id = $1;
    `, [userId]);

    return res.status(200).json({
      error: false,
      auth: true,
      user_name: username,
      user_email: email
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not get user data.'
    });
  }
}