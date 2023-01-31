const Product = require('../models/product');
const Cart = require('../models/cart');
const Orders=require('../models/Orders')

exports.getOrders = (req, res, next) => {

    let TotalPrice=0;
    Cart.findAll().then(caart=>{
      console.log(caart);
      console.log(caart.data);
      res.json(caart);
  
    })
  
  };
  
  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  };
  
  exports.getNewCart=(req,res,next)=>{
    const id= req.body.id;
    const quantity=req.body.quantity;
    console.log(id+"<-->" +quantity)
    Cart.update(
      {
      quantity:quantity},{where:{id:id}}).then(response=>{
      console.log("this is the new response")
      Cart.findOne({where:{id:id}}).then(respon=>{
        console.log("this is the original response")
        console.log(respon);
        res.json(respon);
      })

       // console.log(response);

      }).catch(err=>{
        console.log('err')
      })
  }
  exports.DeleteCartItems =(req,res,next)=>{
    const id=req.body.id;
    Cart.findByPk(id).then(result=>{
    Cart.destroy({
      where:{id:id},
    }).then(response=>{
      console.log(response);
      res.json(result);
    })

  })
  }
  
  exports.PostOrder=(req,res,next)=>{
    Cart.findAll().then(cartItems=>{
    
       //console.log(cartItems[1].productId);
    
       for(let i=0;i<cartItems.length;i++){
        const ProductId=cartItems[i].productId;
        const imageUrl=cartItems[i].imageUrl;
        const quantity=cartItems[i].quantity;
        const title=cartItems[i].title;
        const price=cartItems[i].price;
        const Total=price*quantity;
  
        Orders.create({
          productId:ProductId,
          title:title,
          imageUrl:imageUrl,
          price:price,
          quantity:quantity,
          Total:Total
  
        }).then(res=>{
          Cart.destroy({where:{}}).then(res=>{
            console.log('cart deleted')
          })
        })
  
  
  
  
        
  
      }
      
    })
  }
  
  exports.getOrdersItems=(req,res,next)=>{
    Orders.findAll().then(response=>{
      console.log(response);
      res.json(response);
    })
  }
  