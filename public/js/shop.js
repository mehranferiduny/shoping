

const socket =io();




var sizecheck = document.getElementById("sizecheck");
var colorcheck = document.getElementById("colorcheck");
let sizeChek=document.getElementsByName('radiosize');
let colorChek=document.getElementsByName('radiocolor');




const count= document.querySelector('.count');
const countt= document.querySelector('.countt');
const divCart= document.querySelector('.item_cart'); 
const totall= document.querySelector('.totall'); 
let total=0;
function addToCart(id,userId){
  let data={
    userId:userId,
    product:{
      id:id,
      size:'',
      color:''
    }
  }
  for(var i=0;i<sizeChek.length;i++){
    if(sizeChek[i].checked){
      data.product.size=sizeChek[i].value
    }
  }
  for(var f=0;f<colorChek.length;f++){
    if(colorChek[f].checked){
      data.product.color=colorChek[f].value
    }
  }

  addItem(data);
  divCart.innerHTML="";
   updateitem(userId);

}

function updateitem(userId){

  socket.on("item",(item)=>{

    divCart.innerHTML=""
    for(let product of item.product){
      total=total+product.price;
      count.innerHTML=`${toFarsiNumber(item.product.length)} مورد`
      countt.innerHTML=toFarsiNumber(item.product.length)
      totall.innerHTML=toFarsiNumber(total)
      divCart.innerHTML+=`
      <li>
      <div class="flex gap-x-2 ">
        <!-- Product Image -->
   
        <div class="relative min-w-fit">
          <a href='/product/${product.productID}'>
            <img
              alt=""
              class="h-[120px] w-[120px] radus"
              loading="lazy"
              src="/uploads/products/${product.image}"
            />
          </a>
        
        </div>
   
        <div class="w-full space-y-1.5">
          <!-- Product Title -->
   
          <a class='line-clamp-2 h-12 text-zinc-700 dark:text-white' href='/product/${product.productID}'>
           ${product.title}
          </a>
          <!-- Product Attribute -->
          
          <div
            class="flex items-center justify-between gap-x-2"
          >
            <!-- Product Price -->
            <div
              class="text-emerald-500 dark:text-emerald-400"
            >
            <span class="text-black">قیمت:</span>
              <span class="text-lg font-bold"
                >${toFarsiNumber(separate(product.price))}</span
              >
              <span class="text-sm">تومان</span>
            </div>
            <!-- Product Quantity -->
           
          </div>
        </div>
      </div>
    </li>
      `
    }

   
    
  
   
  
    
  })
}

function addItem(data) {
  socket.emit("add_bsk",data)

  

}


//!lisning
socket.on("addsecses",()=>{
 
  document.getElementById("snackbar").style.display= "block"

  setTimeout(function(){
    document.getElementById("snackbar").style.display= "none"
  },3000)

})
socket.on("addbefor",()=>{
 
  document.getElementById("snackbar2").style.display= "block"

  setTimeout(function(){
    document.getElementById("snackbar2").style.display= "none"
  },3000)
})
socket.on('dontUser',()=>{
  window.location.href='/user/LoginPage'
})
socket.on('likeSecses',()=>{
  
   document.getElementById('heartz').innerHTML=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
   <path
     fill="red"
     stroke="red"
     d="M 10,30
        A 20,18 10,0,1 49.9,35
        A 20,19 10,0,1 91,35
        Q 93,58 50,90
        Q 7,62 10,30 z" />
 </svg>`
    
     document.getElementById('add-to-favorite').innerHTML='حذف از علاقه‌مندی ها'
})
socket.on('dislikeSecses',()=>{
  
   document.getElementById('heartz').innerHTML=`<use xlink:href="#heart"><symbol id="heart" viewBox="0 0 256 256">
   <path d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82Zm-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z" fill="currentColor"></path>
 </symbol></use>`

 document.getElementById('add-to-favorite').innerHTML='    افزودن به علاقه‌مندی ها'

})





function toEnglishNumber(n) {
  const farsiDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return separate(n
    .toString()
    .split('')
    .map(x => farsiDigits[x])
    .join(''));
}
function toFarsiNumber(n) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return separate(n
    .toString()
    .split('')
    .map(x => farsiDigits[x])
    .join(''));
}

function separate(Number) {
  Number+= '';
  Number= Number.replace(',', '');
  x = Number.split('.');
  y = x[0];
  z= x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y))
  y= y.replace(rgx, '$1' + ',' + '$2');
  return y+ z;
  }

function removeitem(url,id,userId){
  const data={productId:id,userId:userId}
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // درخواست Authorization را با مقدار ذخیره شده از متغیر جاوااسکریپت ارسال کنید
      'Authorization': userId
    },
    body:JSON.stringify({ data })
  })
  .then(response =>{
    response.json();
    if(response.status == 200){
      window.location.href ='/user/basketshop';
      
    }
    
  } )  
  

}


function edit(){
  const jamekol=document.getElementById("jamekol");
  let edit=jamekol.innerText

  edit=edit.replace(',','')
  edit=edit.replace(',','')

  // edit=convertPersianToEnglishNumber(edit)
  // edit=parseInt(edit);
  return parseInt(edit)
}




function sendpost(){

  let ersal=document.querySelector('input[name="ersal"]:checked').value;
  const hazineh=document.getElementById("hazinhe");
   
  
  
  if(ersal == "ارسال پست"){
    
  hazineh.innerHTML=`${toFarsiNumber(60000)}  `
  jamekol.innerHTML=toFarsiNumber(edit()+60000);
  }else{
    hazineh.innerHTML=`-`
    jamekol.innerHTML=toFarsiNumber(edit()-60000);
  }
  
}


function like(id,user){

  
   const data={id:id,userId:user}
  socket.emit('like',data)
}





  

