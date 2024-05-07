// UserModel.ts
import { Model, Sequelize, DataTypes } from 'sequelize';

export default class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public birthdate!: Date | null;
    public country!: string | null;
}

export const UserMap = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255)
        },
        email: {
            type: DataTypes.STRING(100)
        },
        password: {
            type: DataTypes.STRING(100)
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'restapi',
        timestamps: false
    });
    User.sync();
};


// // src/models/User.ts
// import { DataTypes, Model } from 'sequelize';
// import { sequelize } from './db';

// export class User extends Model {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;
//   public birthdate!: string;
//   public country!: string;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING(255)
//     },
//     email: {
//         type: DataTypes.STRING(100)
//     },
//     password: {
//         type: DataTypes.STRING(100)
//     },
//     birthdate: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     country: {
//         type: DataTypes.STRING(100),
//         allowNull: true
//     },
//   },
//   {
//     sequelize,
//     modelName: 'User',
//   }
// );
