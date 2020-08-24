const db = require('../../config/database');

module.exports = async (req, res) => {
  const { priority } = req.query;
  const { userId } = req;

  let todos;

  try {
    const queryWithPriority = `
      SELECT
        id, title, description, priority, finished, date_added
      FROM
        users_todos
      WHERE
        user_id = '${userId}' AND priority = ${parseInt(priority)};
    `;

    const queryWithoutPriority = `
      SELECT
        id, title, description, priority, finished, date_added
      FROM
        users_todos
      WHERE
        user_id = '${userId}'
      ORDER BY
        priority DESC;
    `;

    const query = priority
      ? priority > 0 && priority < 4
        ? queryWithPriority
        : queryWithoutPriority
      : queryWithoutPriority;

    const { rows } = await db.query(query, []);

    todos = rows;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Could not verify user to dos.'
    });
  }

  return res.status(200).json({
    error: false,
    todos: todos
  });
}