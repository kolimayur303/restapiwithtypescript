import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('users', 'postgres', '942156', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize };