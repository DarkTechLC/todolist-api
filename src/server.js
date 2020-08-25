require('dotenv-save').config();

const db = require('./config/database');
const app = require('./app');

const PORT = process.env.PORT;

(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR (8),
        username VARCHAR (255) NOT NULL UNIQUE,
        email VARCHAR (255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        PRIMARY KEY (id)
      );
    `, []);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users_todos (
        id VARCHAR (8),
        user_id VARCHAR (8) NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        priority SMALLINT NOT NULL
          CHECK (priority > 0 AND priority < 4),
        finished BOOLEAN DEFAULT FALSE,
        date_added TEXT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
      );    
    `, []);

    app.listen(PORT, () => {
      console.log(`Server running in http://localhost:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
})();