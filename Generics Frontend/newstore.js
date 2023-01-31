//const { checkout, use } = require("../routes/orders");

//const { response } = require("express");


    window.addEventListener('DOMContentLoaded',()=>{



        axios.get('http://localhost:2700/products').
        then(response=>{
            //console.log(response.data);
            for(let i=0;i<response.data.length;i++){
                showOnScreen(response.data[i]);
                
            }
        })
    
    
    })
    
    function showOnScreen(user){
        console.log(user.title)
        const addProductitems=document.getElementsByClassName('shop-items');
      //  document.write(user.title);

    
        const productItems=document.createElement('div');
        productItems.classList.add('shop-item')
        addProductitems[0].appendChild(productItems);
    
       var productrowInner=`  <span class="shop-item-title">${user.title}</span>
       <div  id="shop-itm">
       <img class="shop-item-image" src="${user.imageUrl}">
       </div>
       <div class="shop-item-details">
           <span class="shop-item-price">$${user.price}</span>
            <button  class="btn btn-primary shop-item-button" onclick="AddToCart(${user.id},'${user.title}')">ADD TO CART</button>
         </div>`
    //    productItems.innerHtml=productrowInner
    
    console.log(addProductitems);
    productItems.innerHTML= productItems.innerHTML+productrowInner;
    
    }

    function AddToCart(user,title){
        
        console.log(user);
        
        console.log(title);
        
        
        axios.post(`http://localhost:2700/cart`,{productId:user})
        .then(res=>{
            console.log('response')
            console.log(res);

            
    
                // console.log(res.data[i].id);
                // console.log(res.data);

                if(res.data.productId===user){
                    cretenotification(title);
                    console.log("this is the post Data")
                
                     console.log(res.data);
                     Cartcheck(res.data)
                     document.getElementsByClassName('btn btn-primary btn-purchase')[0].style.display='';
                    // document.getElementsByClassName('no_cart_products')[0].innerHTML='<h2>Please Add Products</h2>';
                     document.getElementsByClassName('no_cart_products')[0].style.display='none';
                }

            
        
        }).catch(err=>{
            if(err){
                console.log(err);
            }
        })
        
    }

   

    
    window.addEventListener('DOMContentLoaded',()=>{
 
       

        axios.get('http://localhost:2700/cart').
        then(response=>{
            if(response.data.length===0){
                document.getElementsByClassName('btn btn-primary btn-purchase')[0].style.display='none';
                document.getElementsByClassName('no_cart_products')[0].innerHTML='<h2>Please Add Products</h2>';

            }
            
            for(let i=0;i<response.data.length;i++){
                CartData(response.data[i]);
                updateCartTotal();
            }

        })
    })

    let Totaaal=0;
    function Cartcheck(user){
        // var c=document.getElementById(user.title);
        // console.log(c)
        if(document.getElementById(user.title)!=null){
            console.log('the item is present in cart')
        muge(user.title,user.quantity,user.price)
        updateCartTotal();




           // increaseQuantity(user.quantity,user.id)
        }

        else{
            CartData(user);
            updateCartTotal()
        }
    }




    function CartData(user){
       
        // var CartRow=document.createElement('div');
        // CartRow.classList.add('cart-rows');
    
        //CartRow.innerText=title;
        var CartItems=document.getElementsByClassName('cart-items')[0];
        console.log(CartItems);
        
        const TotalPrice=user.quantity*user.price;
        Totaaal=Totaaal+TotalPrice;
       // console.log(Totaaal)
    //    var int=document.getElementsByClassName('cart-row')[0];
    //    console.log(int);
    //    int.setAttribute('id',`${user.title}`);


        var cartRowContent=`<div class="cart-rows" id="${user.title}" ><div class="cart-item cart-column" >
        
        <img class="cart-item-image" src="${user.imageUrl}" width="100" height="100">
        <span class="cart-item-title">${user.title}</span>
        </div>
      <span class="cart-price cart-column">${TotalPrice}</span>

      <div class="cart-quantity cart-column">
      <button id="decrese_q " onclick="DecreaseQuantity('${user.title}', ${user.id})">-</button>
      <h3 id="q_input  ">${user.quantity}</h3>
     <button id="increase_q" onclick="increaseQuantity(${user.id},'${user.title}')">+</button>
      <button class="btn btn-danger"  onclick="Delete(${user.id},'${user.title}')">REMOVE</button>
     
     
     
     </div>
     </div>`
     //CartRow.innerHTML= cartRowContent;
     //CartItems.appendChild(CartRow);
     CartItems.innerHTML=CartItems.innerHTML+cartRowContent;

    // CartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',Delete(user.id));
        
     //updateCartTotal();
    // huge(user.title)


    }
    function increaseQuantity( id,title){
        console.log(id);
        console.log(title);
         const c= document.getElementById(title);
         console.log(c);
        let qty= c.children[2].children[1].innerText;
       // qty.toString();
       let  j=parseInt(qty);
       console.log(qty);
        
        console.log("this is the increse qty"+qty)
        
        qnt=j+1;
        console.log(qnt);
        axios.post('http://localhost:2700/newcart',{id:id,quantity:qnt}).
        then(response=>{
            console.log("this is increase "+response.data);
            console.log(response);
            huge(response.data.title,response.data.quantity,response.data.price);
            updateCartTotal()

           // console.log("this is increase "+response.data);
        }).catch(err=>{

        })
       // window.location.reload();
        
    }
function DecreaseQuantity(title, id){
    console.log(id);
    console.log(title);
     const c= document.getElementById(title);
     console.log(c);
    let qty= c.children[2].children[1].innerText;
   // qty.toString();
   let  j=parseInt(qty);
   console.log(qty);
    if(j-1!=0){
        qnt=j-1;
        axios.post('http://localhost:2700/newcart',{id:id,quantity:qnt}).
        then(response=>{
            fuge(response.data.title,response.data.quantity,response.data.price);
            updateCartTotal()
            
           
            
        })

    }
    else{
        alert('there should be minimum 1 quantity');
    }
   // window.location.reload();
    
}
function Delete(user,title){
   
    //const c=document.getElementById(user);
    //console.log(c)
   // c.remove();
    axios.post('http://localhost:2700/deleteCart',{id:user}).
    then(res=>{
        console.log("this is the delete res" )
        console.log(res);


        document.getElementById(res.data.title).remove();
        Totaaal=Totaaal-(res.data.price*res.data.quantity)
        
        updateCartTotal();
        var CartItems=document.getElementsByClassName('cart-items')[0];
        console.log(CartItems);
        console.log(    CartItems.children);
        if(CartItems.children.length===0){
            document.getElementsByClassName('btn btn-primary btn-purchase')[0].style.display='none';
            document.getElementsByClassName('no_cart_products')[0].style.display='';

            //document.getElementsByClassName('no_cart_products')[0].innerHTML='<h2>Please Add Products</h2>';
            
        }

       // document.getElementById(`${user}`).remove();
       // CartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCratItems);
    })

   // window.location.reload();


}



    



function updateCartTotal(){
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+Totaaal;

   


}
function orders(){
    axios.post('http://localhost:2700/orders').
    then(res=>{

    })

}

const cont=document.getElementById('new_divclass');
function cretenotification(Title){
    const notif=document.createElement('div');

    notif.classList.add('toast')
    notif.innerText=`your product -> ${Title} is added to cart`;
    cont.appendChild(notif);
    setTimeout(()=>{
        notif.remove()
    },3000)
}

const btn=document.getElementById('but_of')
const sec=document.getElementById('super')
const but2=document.getElementById('but_2')
sec.style.display='none';

btn.addEventListener('click', ()=>{
    sec.style.display='flex'
    sec.classList.toggle('active');
    // btn.classList.toggle('active');
})
but2.addEventListener('click',()=>{
    sec.style.display='none'


    
    sec.classList.toggle('active')
    


})

function huge(title,quantity,price){
   const c= document.getElementById(title);
   console.log(c);
   c.children[2].children[1].innerText=quantity;
   c.children[1].innerText=quantity*price;
 


   Totaaal=Totaaal+price;
  
}
function fuge(title,quantity,price){
    const c= document.getElementById(title);
    console.log(c);
    c.children[2].children[1].innerText=quantity;
    c.children[1].innerText=quantity*price;
 
    Totaaal=Totaaal-price;
 }
 function muge(title,quantity,price){
    const c= document.getElementById(title);
    console.log(c);
    c.children[2].children[1].innerText=quantity;
    c.children[1].innerText=quantity*price;
    let j=c.children[1].innerText;
    console.log(j);
    let k=parseInt(j);
    console.log('this is k'+k);
 
    Totaaal=Totaaal+(k/quantity);
    //updateCartTotal()
   
 }

// <button class="btn btn-danger" onclick="Delete(${user.productId})">REMOVE</button>






