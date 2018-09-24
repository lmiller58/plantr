const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = db.define('gardeners', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
});

const Plot = db.define('plots', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
});

const Vegetable = db.define('veggies', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  plantedOn: Sequelize.DATE
});

Plot.belongsTo(Gardener);
//many-to-many table for plot/veg.
Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' });
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' });

Gardener.belongsTo(Vegetable, { as: 'favorite_veg' });

// let vegetable = new Plot({
//   size: 10,
//   color: 'Purple',
//   plantedOn: new Date()
// });
// let vegetable1 = new Vegetable({
//   name: 'Celery',
//   color: 'Green',
//   plantedOn: new Date() - 100000
// });
// vegetable.save();
let newVeg = Vegetable.create({
  name: 'Zucchini',
  color: 'Green',
  plantedOn: new Date()
});

const newGardener = newVeg().then(veg => {
  return Gardener.create({
    name: 'billy',
    age: 123,
    favoriteVegId: veg.id
  });
});

module.exports = db;
