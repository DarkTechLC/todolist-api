require('dotenv-save').config();
const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}...`);
});