

    window.addEventListener('DOMContentLoaded',()=>{



        axios.get('http://localhost:2700/').
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
        
        
        axios.post(`http://localhost:2700/cart/${user}`)
        .then(res=>{
            
            for(let i=0;i<res.data.length;i++){
                // console.log(res.data[i].id);
                // console.log(res.data);

                if(res.data[i].productId===user){
                    cretenotification(title);
                
                     console.log(res.data[i]);
                     Cartcheck(res.data[i])
                }
            }
            

            
          //  CartData(user,title,quantity,price,imageUrl);
        
            
           // setTimeout(()=>{window.location.reload()},3000)
            
            


            //console.log(res);
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
        if(document.getElementById(user.id)!=null){

           // increaseQuantity(user.quantity,user.id)
        }

        else{
            CartData(user);
        }
    }



    function CartData(user){
       
        var CartRow=document.createElement('div');
        CartRow.classList.add('cart-row');
    
        //CartRow.innerText=title;
        var CartItems=document.getElementsByClassName('cart-items')[0];
        CartItems.appendChild(CartRow);
        const TotalPrice=user.quantity*user.price;
        Totaaal=Totaaal+TotalPrice;
       // console.log(Totaaal)
       var int=document.getElementsByClassName('cart-row')[0];
       console.log(int);
       int.setAttribute('id',`${user.id}`);


        var cartRowContent=`<div class="cart-item cart-column" id="${user.id}" >
        
        <img class="cart-item-image" src="${user.imageUrl}" width="100" height="100">
        <span class="cart-item-title">${user.title}</span>
        </div>
      <span class="cart-price cart-column">${TotalPrice}</span>

      <div class="cart-quantity cart-column">
      <button id="decrese_q" onclick="DecreaseQuantity(${user.quantity}, ${user.id})">-</button>
      <h3 id="q_input ">${user.quantity}</h3>
     <button id="increase_q" onclick="increaseQuantity(${user.quantity},${user.id})">+</button>
     <button class="btn btn-danger" onclick="Delete(${user.id})">REMOVE</button>
     </div>`
     CartRow.innerHTML=CartRow.innerHTML+  cartRowContent;
        
     //updateCartTotal();


    }
    function increaseQuantity(qty, id){
        console.log("this is the increse qty"+qty)
        
        qnt=qty+1;
        console.log(qnt);
        axios.post('http://localhost:2700/newcart',{id:id,quantity:qnt}).
        then(response=>{
            console.log("this is increase "+response.data);
        }).catch(err=>{

        })
       // window.location.reload();
        
    }
function DecreaseQuantity(qty, id){
    if(qty-1!=0){
        qnt=qty-1;
        axios.post('http://localhost:2700/newcart',{id:id,quantity:qnt}).
        then(res=>{
           
            console.log(res);
        })

    }
    else{
        alert('there should be minimum 1 quantity');
    }
   // window.location.reload();
    
}
function Delete(user){
    axios.post('http://localhost:2700/deleteCart',{id:user}).
    then(res=>{
        console.log("this is the delete response"+res);
        document.getElementById(`${user}`).remove();
       // CartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCratItems);
    })
   // window.location.reload();


}
// function removeCratItems(event){
//     var buttonClicked=event.target
//         buttonClicked.parentElement.parentElement.remove();
//         //console.log('clicked')
//        // updateCartTotal();

// }


    



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





