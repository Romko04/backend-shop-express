const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});


const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
)

const UserRefreshToken = sequelize.define(
  'user_refresh_token',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
)

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
)

const ProductInfo = sequelize.define(
  'product_info',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
)

const BasketProduct = sequelize.define(
  'basket_product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  }
)

const Basket = sequelize.define(
  'basket',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  }
)

const Rating = sequelize.define(
  'rating',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: 0
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
)

const Category = sequelize.define(
  'categories',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(UserRefreshToken)
UserRefreshToken.belongsTo(User)


User.hasMany(Rating)
Rating.belongsTo(Rating)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

// BasketProduct.hasOne(Product)
// Product.belongsTo(BasketProduct)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)


Category.hasMany(Product)
Product.belongsTo(Category)


module.exports = {sequelize, Product, Basket, BasketProduct, Category, ProductInfo, Rating, User}