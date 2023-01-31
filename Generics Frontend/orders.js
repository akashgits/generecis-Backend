window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:2700/orderItems').then(response=>{
        console.log(response);

    if(response.data.length===0){
        var CartItems=document.getElementsByClassName('cart-items_new')[0];
        const c=`<h1>No orders Yet</h1>`
        CartItems.innerHTML=CartItems.innerHTML+c;

    }

    for(let i=response.data.length-1;i>=0;i--){
        orderItems(response.data[i]);
    }
    })
})


function orderItems(user){
    var CartRow=document.createElement('div');
    CartRow.classList.add('cart-row_of');
    //CartRow.innerText=title;
    var CartItems=document.getElementsByClassName('cart-items_new')[0];
    CartItems.appendChild(CartRow);
    //const TotalPrice=user.quantity*user.price;
    //Totaaal=Totaaal+TotalPrice;
    //console.log(Totaaal);

//     var cartRowContent=`<div class="cart-item cart-column">
//     <img class="cart-item-image" src="${user.imageUrl}" width="100" height="100">
//     <span class="cart-item-title">${user.title}</span>

//   </div>
//   <h3 id="q_input">quantity:${user.quantity}</h3>
//   <span class="cart-price cart-column">Price: ${user.Total}</span>
//   <p>Ordered At:${user.createdAt}</p> 
  

//   <div class="cart-quantity cart-column">



//  </div>
//  <hr>`

var cartRowContent=`
    <img  src="${user.imageUrl}" width="100" height="100">
    

    <span>${user.title}</span>
    <br>
  <h3>quantity:${user.quantity}</h3>
  <h3 >Price: ${user.Total}</h3>
  <p>Ordered At:${user.createdAt}</p> 
  <hr>
  
  
  
 
  `
 CartRow.innerHTML=cartRowContent;
 //updateCartTotal();


}