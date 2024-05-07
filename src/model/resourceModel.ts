import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

interface ResourceAttributes {
  id: number;
  name: string;
  description: string;
}

class Resource extends Model<ResourceAttributes> implements ResourceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Resource',
    tableName: 'resources',
    timestamps: true,
    underscored: true,
  }
);

export { Resource };
