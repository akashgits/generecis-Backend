const Product = require('../models/product');
const Cart = require('../models/cart');
const Orders=require('../models/Orders')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
   
      res.json(products);
    })
    .catch(err => {
      console.log(err);
    });
};



exports.getCart = (req, res, next) => {
  Cart.findAll().
  then(cart=>{
    res.json(cart)
  }).catch(err=>{
    if(err){
      console.log("error");
    }
  })

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("this is the product cart-->"+prodId)
   Product.findByPk(prodId).then(product => {
    console.log(product);
    Cart.findOne({where:{productId:product.id}})
    .then(response=>{
      if(response=== null){
        Cart.create({
          productId:product.id,
           title:product.title,
         
          
          imageUrl:product.imageUrl,
          quantity:product.quantity,
          price:product.price
          

        }).then(kres=>{
          console.log('cart is created');
          console.log(kres);
          res.json(kres)
        })

      }
      
      if(response!=null){

        console.log(response.id+'<-->'+response.productId+"-->"+response.quantity+"-->"+response.title);
        const c=response.quantity;
        Cart.update(
          {
          quantity:c+1},{
            where:{productId:response.productId,}
            

          })
          
          

          
        .then(respon=>{
          Cart.findOne({where:{productId:response.productId}}).then(resp=>{
            res.json(resp);

          })
          
          
        }).catch(err=>{
          console.log(err);
        })
        // Cart.findOne({where:{quantity}})
        // .then(response=>{
        //   console.log("i am quantity"+response)
        // })
         /// productId:product.id,
         // quantity:quantity+1


        //})

        

      }


      
    })

 // res.redirect('/cart');
});
}

exports.postCartDeleteProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  const prodId = req.body.id;
  //Product.findById(prodId, product => {
    Cart.findByPk(prodId).then(result=>{
       Cart.destroy({where:{id:prodId}}).
      then(response=>{
        response?res.send('yes'):res.send('no');
        // console.log("delete response");
        // console.log(result)
        // res.json(result)
  
      }).catch(err=>{
        console.log('err');
      })

    })
  
    
 // });
};


