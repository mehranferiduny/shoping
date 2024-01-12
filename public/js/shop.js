const socket =io();



var x = document.getElementById("snackbar");
var z = document.getElementById("snackbar2");

 



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