const { response } = require("express");

const socket =io();



var x = document.getElementById("snackbar");
var z = document.getElementById("snackbar2");
var sizecheck = document.getElementById("sizecheck");
var colorcheck = document.getElementById("colorcheck");
let sizeChek=document.getElementsByName('radiosize');
let colorChek=document.getElementsByName('radiocolor');




x.style="display:none"
x.style="display:none"




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
      <div class="flex gap-x-2 py-5">
        <!-- Product Image -->
   
        <div class="relative min-w-fit">
          <a href='/product-detail'>
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
   
          <a class='line-clamp-2 h-12 text-zinc-700 dark:text-white' href='/product-detail'>
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

    for(let i=0;i<item.user.product.length;i++){
      document.getElementById('colorbsk').innerHTML=item.user.product[i].color

    }
    for(let i=0;i<item.user.product.length;i++){
      document.getElementById('sizebsk').innerHTML=item.user.product[i].size

    }
    

   
  
    
  })
}

function addItem(data) {
  socket.emit("add_bsk",data)

  socket.on("secses",()=>{
   // Add the "show" class to DIV
   x.className = "show";

   // After 3 seconds, remove the show class from DIV
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  })


}



//!lesning
socket.on('add-befor',()=>{
 
   // Add the "show" class to DIV
 z.className = "show";

 // After 3 seconds, remove the show class from DIV
 setTimeout(function(){ z.className = z.className.replace("show", ""); }, 3000);
})



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



function convertPersianToEnglishNumber(persianNumber) {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let englishNumber = '';

  for (let i = 0; i < persianNumber.length; i++) {
    const char = persianNumber[i];
    const index = persianNumbers.indexOf(char);
    
    if (index !== -1) {
      englishNumber += index;
    } else {
      englishNumber += char;
    }
  }

  return parseInt(englishNumber, 10);
}

function removevirgol(number){
  return number.replace(/,/,'').replace(/^+/,'0');
}

function edit(){
  const jamekol=document.getElementById("jamekol");
  let edit=jamekol.innerText
  console.log(edit);
  edit=removevirgol(edit)
  console.log(edit);
  edit=convertPersianToEnglishNumber(edit)
  edit=parseInt(edit);
  return edit
}




function sendpost(){
  console.log(edit());
  let ersal=document.querySelector('input[name="ersal"]:checked').value;
  const hazineh=document.getElementById("hazinhe");

  
  
  if(ersal == "ارسال پست"){
    
  hazineh.innerHTML=`${toFarsiNumber(60000)}  `
  jamekol.innerHTML=toFarsiNumber(edit()+60000);
  }else{
    hazineh.innerHTML=`${toFarsiNumber(0)}`
    jamekol.innerHTML=toFarsiNumber(edit()-60000);
  }
  
}







//!catgory
function sendCatgory(id){
  console.log(id);
  fetch('/category',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // درخواست Authorization را با مقدار ذخیره شده از متغیر جاوااسکریپت ارسال کنید
      'Authorization': id
    }
  }).then(response=>{
     response.json()
  })
}