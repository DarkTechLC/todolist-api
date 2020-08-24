const editToDoData = async (req, res) => {
  const { title, description, priority } = req.body;
  const { id } = req.params;

  return res.status(200).json({
    error: false,
    updated_todo: {
      id: id,
      title: title,
      description: description,
      priority: priority,
    }
  });
}

const finishToDo = async (req, res) => {
  const { finished } = req.body;
  const { id } = req.params;

  return res.status(200).json({
    error: false,
    updated_todo: {
      id: id,
      finished: finished
    }
  });
}

module.exports = {
  editToDoData,
  finishToDo
}