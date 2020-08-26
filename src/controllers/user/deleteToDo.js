const db = require('../../config/database');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows: todosRows } = await db.query(`
      SELECT id
      FROM users_todos
      WHERE id = $1
      LIMIT 1;
    `, [id]);

    if (todosRows.length === 0)
      return res.status(404).json({
        error: true,
        message: 'Could not delete todo: doesn\'t exist.'
      });

    await db.query(`
      DELETE FROM users_todos
      WHERE id = $1;
    `, [id]);

    return res.status(200).json({
      error: false,
      deleted_todo: {
        id: id
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Could not delete todo.'
    });
  }
}