const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

const cors=require('cors');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');

 const shopRoutes = require('./routes/shop');
const orderRoutes = require('./routes/orders');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(orderRoutes);

app.use(errorController.get404);


sequelize
  .sync()
  //.sync({force:true})
  .then(result => {
    // console.log(result);
    app.listen(2700);
  })
  .catch(err => {
    console.log(err);
  });

