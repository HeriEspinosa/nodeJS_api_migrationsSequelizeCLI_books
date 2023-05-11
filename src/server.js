require('dotenv').config;
const app = require('../src/app');

const port = +process.env.PORT || 3600;

app.listen(port, () => {
  console.log(`App running on port ${port} 🥳`);
});
