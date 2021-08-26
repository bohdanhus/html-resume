  const app = require('./app');
  const sequalize = require('./sequelize');
  const modelDb = require('./modelsDb')

  const start = async() => {
      try {
          await sequalize.authenticate();
          await sequalize.sync();
          app.listen(3000);
      } catch (e) {
          console.log(e);
      }
  }

  start();