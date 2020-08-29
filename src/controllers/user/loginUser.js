const db = require('../../config/database');
const comparePassword = require('../../utils/comparePassword');
const generateTokenByTheID = require('../../utils/generateTokenByTheID');

module.exports = async (req, res) => {
  let { user_email, password } = req.body;

  // Validations
  if (!user_email || !password)
    return res.status(400).json({
      error: true,
      auth: false,
      message: 'There can be no blank fields.'
    });

  user_email = user_email.toLowerCase().trim();

  try {
    const { rows: emailRows } = await db.query(`
      SELECT email
      FROM users 
      WHERE email = $1
      LIMIT 1;
    `, [user_email]);

    if (emailRows.length === 0)
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
    const { rows: [{ password: passwordResult }] } = await db.query(`
      SELECT password
      FROM users
      WHERE email = $1
      LIMIT 1;
    `, [user_email]);

    const match = await comparePassword(password, passwordResult);

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

  try {
    const { rows: [{ id, username }] } = await db.query(`
      SELECT id, username
      FROM users
      WHERE email = $1
      LIMIT 1;
    `, [user_email]);

    return res.status(200).json({
      error: false,
      auth: true,
      token: generateTokenByTheID(id),
      user_name: username
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not verify user data.'
    });
  }
}