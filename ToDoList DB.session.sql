SELECT id,
  title,
  description,
  priority,
  finished,
  date_added
FROM users_todos
WHERE user_id = 'a94a51cf'
ORDER BY date_added DESC;
SELECT id,
  title,
  description,
  priority,
  finished,
  date_added
FROM users_todos
WHERE user_id = 'a94a51cf'
  AND priority = 3
ORDER BY date_added DESC;