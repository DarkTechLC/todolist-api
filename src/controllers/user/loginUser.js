const db = require('../../config/database');
const comparePassword = require('../../utils/comparePassword');
const generateTokenByTheID = require('../../utils/generateTokenByTheID');

module.exports = async (req, res) => {
  const { user_email, password } = req.body;

  // Validations
  if (!user_email || !password)
    return res.status(400).json({
      error: true,
      auth: false,
      message: 'There can be no blank fields.'
    });

  try {
    const emailResult = await db.query(`
      SELECT email FROM users WHERE email = '${user_email}' LIMIT 1;
    `, []);

    if (emailResult.rows.length === 0)
      return res.status(400).json({
        error: true,
        auth: false,
        message: 'E-mail does not exist.'
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not verify e-mail.'
    });
  }

  try {
    const passwordResult = await db.query(`
      SELECT password FROM users WHERE email = '${user_email}' LIMIT 1;
    `, []);

    const match = await comparePassword(password, passwordResult.rows[0].password);

    if (!match)
      return res.status(401).json({
        error: true,
        auth: false,
        message: 'Invalid password.'
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not verify password.'
    });
  }

  const user = {
    id: null,
    username: null
  }

  try {
    const userResult = await db.query(`
      SELECT id, username FROM users WHERE email = '${user_email}' LIMIT 1;
    `, []);

    const { id, username } = userResult.rows[0];

    user.id = id;
    user.username = username;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not verify user data.'
    });
  }

  return res.status(200).json({
    error: false,
    auth: true,
    token: generateTokenByTheID(user.id),
    user_name: user.username
  });
}