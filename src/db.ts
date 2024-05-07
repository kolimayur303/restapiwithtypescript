import { Sequelize } from 'sequelize';
import User, { UserMap } from './model'; // Assuming UserModel.ts is in the same directory as User.ts

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "restapi",
  username: "postgres",
  password: "942156"
});

// UserMap(sequelize); 
// Object.keys(null)
// Object.assign(window.UndefinedVariable, {})
// // database.ts
// import { Sequelize } from 'sequelize';
// import User, { UserMap } from './model';

// export const sequelize = new Sequelize({
//     dialect: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "restapi",
//     username: "postgres",
//     password: "942156"
// });

// UserMap(sequelize);
