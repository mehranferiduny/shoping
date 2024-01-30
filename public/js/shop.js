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
   console.log(item);
    divCart.innerHTML=""

  
    for(let product of item.product){
      total=total+product.price;
      count.innerHTML=`${toFarsiNumber(item.product.length)} مورد`
       console.log(product);
      
   


      divCart.innerHTML+=`
      <li>
      <div class="flex gap-x-2 py-5">
        <!-- Product Image -->
   
        <div class="relative min-w-fit">
          <a href='/product-detail'>
            <img
              alt=""
              class="h-[120px] w-[120px]"
              loading="lazy"
              src="/uploads/products/${product.image}"
            />
          </a>
          <button
            class="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-black"
            type="button"
            onclick="removeitem(${product._id},${userId})"
            
          >
            <svg
              class="h-6 w-6 text-red-600 dark:text-red-500"
            >
              <use xlink:href="#close" />
            </svg>
          </button>
        </div>
   
        <div class="w-full space-y-1.5">
          <!-- Product Title -->
   
          <a class='line-clamp-2 h-12 text-zinc-700 dark:text-white' href='/product-detail'>
           ${product.title}
          </a>
          <!-- Product Attribute -->
          <div
            class="flex items-center gap-x-2 text-sm text-zinc-500 dark:text-gray-300"
          >
          <span id="sizebsk"> </span>
           
            <div
              class="h-3 w-px rounded-full bg-gray-200 dark:bg-white/5"
            ></div>
            <div class="flex items-center gap-x-2">
              
              <span id="colorbsk"> </span>
            </div>
          </div>
          <div
            class="flex items-center justify-between gap-x-2"
          >
            <!-- Product Price -->
            <div
              class="text-emerald-500 dark:text-emerald-400"
            >
              <span class="text-lg font-bold"
                >${toFarsiNumber(product.price)}</span
              >
              <span class="text-sm">تومان</span>
            </div>
            <!-- Product Quantity -->
            <div
              class="flex h-10 w-24 items-center justify-between rounded-lg border border-gray-100 px-2 py-1 dark:border-white/5"
            >
              <button
                type="button"
                data-action="increment"
              >
                <svg
                  class="h-5 w-5 text-emerald-500 dark:text-emerald-400"
                >
                  <use xlink:href="#plus" />
                </svg>
              </button>
              <input
                value="1"
                disabled
                type="number"
                class="flex h-5 w-full grow select-none items-center justify-center bg-transparent text-center text-sm text-zinc-700 outline-none dark:text-white"
              />
              <button
                type="button"
                data-action="decrement"
              >
                <svg
                  class="h-5 w-5 text-red-600 dark:text-red-500"
                >
                  <use xlink:href="#minus" />
                </svg>
              </button>
            </div>
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

function removeitem(id,userId){
  console.log(id,"inn",userId);

  const data={productId:id,userId:userId}
  socket.emit("remove",data);
  updateitem(userId);

}







