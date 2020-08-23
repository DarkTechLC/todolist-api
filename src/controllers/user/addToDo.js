const db = require('../../config/database');
const generateID = require('../../utils/generateID');

module.exports = async (req, res) => {
  const { title, description, priority } = req.body;
  const { userId } = req;

  // Validations
  if (!title || !priority)
    return res.status(400).json({
      error: true,
      message: 'The title and priority field cannot be empty.'
    });

  const verifyPriorityRegex = /[1-3]/;

  if (!verifyPriorityRegex.test(priority))
    return res.status(400).json({
      error: true,
      message: 'The priority must be a value from 1 to 3.'
    });

  const todoData = {
    id: generateID(),
    user_id: userId,
    title,
    description,
    priority: parseInt(priority),
    finished: false,
    date_added: new Date()
  }

  try {
    await db.query(`
      INSERT INTO users_todos
        (id, user_id, title, description, priority, finished, date_added)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, Object.values(todoData));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Could not save to do.'
    });
  }

  const { user_id, ...todoDataWithoutUserId } = todoData;

  return res.status(200).json({
    error: false,
    auth: true,
    new_todo: todoDataWithoutUserId
  });
}