import {DataTypes} from 'sequelize';
import sequelize from "../utils/db.helper.js";


const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len:[8, 100],
      }
    }
  },
  {
    tableName: 'user',
    createdAt: false,
    updatedAt: false,
  }
);

export default User;