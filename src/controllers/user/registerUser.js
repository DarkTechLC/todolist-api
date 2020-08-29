const db = require('../../config/database');
const generateID = require('../../utils/generateID');
const generatePasswordHash = require('../../utils/generatePasswordHash');
const generateTokenByTheID = require('../../utils/generateTokenByTheID');

module.exports = async (req, res) => {
  let { user_name, user_email, password } = req.body;

  // Validations
  if (!user_name || !user_email || !password)
    return res.status(400).json({
      error: true,
      auth: false,
      message: 'There can be no blank fields.'
    });

  user_name = user_name.trim();
  user_email = user_email.toLowerCase().trim();

  const verifyEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!verifyEmailRegex.test(user_email))
    return res.status(400).json({
      error: true,
      auth: false,
      message: 'Invalid e-mail.'
    });

  const verifyPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  // const verifyPasswordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+=/?;.,\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!verifyPasswordRegex.test(password))
    return res.status(400).json({
      error: true,
      auth: false,
      message: 'The password must contain at least 8 characters, which are: uppercase, lowercase and numeric.'
    });

  try {
    const { rows: usernameRows } = await db.query(`
      SELECT username
      FROM users
      WHERE username = $1
      LIMIT 1;
    `, [user_name]);

    if (usernameRows.length > 0)
      return res.status(409).json({
        error: true,
        auth: false,
        message: 'Username already exists.'
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not verify username.'
    });
  }

  try {
    const { rows: emailRows } = await db.query(`
      SELECT email
      FROM users
      WHERE email = $1
      LIMIT 1;
    `, [user_email]);

    if (emailRows.length > 0)
      return res.status(409).json({
        error: true,
        auth: false,
        message: 'E-mail already exists.'
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
    const user = {
      id: generateID(),
      username: user_name,
      email: user_email,
      password: await generatePasswordHash(password)
    }

    await db.query(`
      INSERT INTO users 
        (id, username, email, password)
      VALUES ($1, $2, $3, $4);
    `, Object.values(user));

    return res.status(201).json({
      error: false,
      auth: true,
      token: generateTokenByTheID(user.id),
      user_name: user.username
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      auth: false,
      message: 'Could not create an account.'
    });
  }
}