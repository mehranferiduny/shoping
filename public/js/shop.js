const socket =io();



var x = document.getElementById("snackbar");
var z = document.getElementById("snackbar2");







 
function addToCart(id,title,image,color,price,userId){
  addItem(id,userId);
  const divCart= document.querySelector('.item_cart');
  socket.on("item",(item)=>{
     item.forEach(element => {
      
     divCart.innerHTML=`
     <li>
     <div class="flex gap-x-2 py-5">
       <!-- Product Image -->
  
       <div class="relative min-w-fit">
         <a href='/product-detail'>
           <img
             alt=""
             class="h-[120px] w-[120px]"
             loading="lazy"
             src="/uploads/products/${element.image}"
           />
         </a>
         <button
           class="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-black"
           type="button"
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
          ${element.title}
         </a>
         <!-- Product Attribute -->
         <div
           class="flex items-center gap-x-2 text-sm text-zinc-500 dark:text-gray-300"
         >
           <div>تعداد : 1</div>
           <div
             class="h-3 w-px rounded-full bg-gray-200 dark:bg-white/5"
           ></div>
           <div class="flex items-center gap-x-2">
             <span
               class="h-4 w-4 rounded-full"
               style="background: rgb(128, 128, 128)"
             ></span>
             <span> ${element.color}</span>
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
               >${element.price}</span
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
     });
  })
   

}


function addItem(productId,userId) {
  socket.emit("add_bsk",{
    userId:userId,
    productId:productId
  })

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

