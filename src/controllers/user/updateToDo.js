const db = require('../../config/database');

const editToDoData = async (req, res) => {
  const { title, description, priority } = req.body;
  const { id } = req.params;

  if (!title || !priority)
    return res.status(400).json({
      error: true,
      message: 'The title and priority field cannot be empty.',
    });

  const verifyPriorityRegex = /[1-3]/;

  if (!verifyPriorityRegex.test(priority))
    return res.status(400).json({
      error: true,
      message: 'The priority must be a value from 1 to 3.',
    });

  try {
    const { rows: todosRows } = await db.query(
      `
      SELECT id
      FROM users_todos
      WHERE id = $1
      LIMIT 1;
    `,
      [id]
    );

    if (todosRows.length === 0)
      return res.status(404).json({
        error: true,
        message: "Could not update todo: doesn't exist.",
      });

    await db.query(
      `
      UPDATE users_todos
      SET
        title = $1,
        description = $2,
        priority = $3
      WHERE id = $4;
    `,
      [title, description, parseInt(priority), id]
    );

    return res.status(200).json({
      error: false,
      updated_todo: {
        id: id,
        title: title,
        description: description,
        priority: priority,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Could not update to do.',
    });
  }
};

const finishToDo = async (req, res) => {
  const { id: todoId } = req.params;

  try {
    const { rows: todosRows } = await db.query(
      `
      SELECT id
      FROM users_todos
      WHERE id = $1
      LIMIT 1;
    `,
      [todoId]
    );

    if (todosRows.length === 0)
      return res.status(404).json({
        error: true,
        message: "Could not update todo: doesn't exist.",
      });

    const {
      rows: [{ id, finished }],
    } = await db.query(
      `
      UPDATE users_todos
      SET finished = NOT (
          SELECT finished
          FROM users_todos
          WHERE id = $1
          LIMIT 1
        )
      WHERE id = $1
      RETURNING id, finished;
    `,
      [todoId]
    );

    return res.status(200).json({
      error: false,
      updated_todo: {
        id: id,
        finished: finished,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Could not update to do.',
    });
  }
};

module.exports = {
  editToDoData,
  finishToDo,
};
