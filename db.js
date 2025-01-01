const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


const Role = sequelize.define('role', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
}, {
  tableName: 'roles',
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
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'id',
      },
      allowNull: false,
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

const DeliveryMethod = sequelize.define(
  'delivery_method',
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
  }
)

const PaymentMethod = sequelize.define(
  'payment_method',
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
  }
)

const Order = sequelize.define(
  'order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
)

const OrderProduct = sequelize.define('OrderProduct', {
  orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'orders',
          key: 'id',
      },
  },
  productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'products',
          key: 'id',
      },
  },
  quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'order_products',
});


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
    },
    basketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'baskets',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
)

const UserProductRating = sequelize.define(
  'user_product_rating',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'productId'],
      },
    ],
  }
);

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


Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

BasketProduct.belongsTo(Product)
Product.hasMany(BasketProduct)


Category.hasMany(Product)
Product.belongsTo(Category)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Order.belongsTo(DeliveryMethod)

Order.belongsTo(PaymentMethod)


User.hasMany(UserProductRating)
UserProductRating.belongsTo(User)

Rating.hasMany(UserProductRating)
UserProductRating.belongsTo(Rating)

Product.hasMany(UserProductRating)
UserProductRating.belongsTo(Product)



module.exports = {sequelize, UserProductRating, Basket, BasketProduct,  Category, ProductInfo,  Rating,  User, Role, Order, DeliveryMethod, PaymentMethod, OrderProduct,
}