const db = require('./model');

db.sync()
  .then(() => {
    console.log('Database synced!');
    // db.close();
  })
  .catch(err => {
    console.log('Disaster!!!');
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
