import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public accessLevel!: string;
  public async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  lastName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  accessLevel:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']]
    }
  },
}, {
  tableName: 'Users',
  sequelize,
  hooks: {
    beforeCreate: async (user: User) => {
      await user.hashPassword();
    },
    beforeUpdate: async (user: User) => {
      await user.hashPassword();
    }
  }
});