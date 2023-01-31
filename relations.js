const user=require('./models/user')
const order=require('./models/Orders')
const cart=require('./models/cart')
const product=require('./models/product')

const sequelize = require('./util/database');

user.hasMany(cart);
cart.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

review.belongsTo(order);
order.hasOne(review);


user.hasMany(review);
review.belongsTo(user);


resturant.belongsTo(user);
user.hasMany(resturant);

resturant.hasMany(product);
product.belongsTo(resturant);

