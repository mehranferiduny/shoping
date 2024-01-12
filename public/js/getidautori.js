function getidauth(method,productId,url,redirct,name){

  if(url == '/dashbord/deleteCategory'){
    confirm("با حذف دسته بندی همه ی محصولات این دسته بندی پاک میشود.آیا مایل به ادامه هستید");
  }

  if(url == '/dashbord/deleteProduct'){
    confirm("آیا از حذف محصول مطمعن هستید؟");
  }



  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // درخواست Authorization را با مقدار ذخیره شده از متغیر جاوااسکریپت ارسال کنید
      'Authorization': productId
    }
  })
  .then(response =>{
    response.json();
  
    if(response.status == 200){
      window.location.href =redirct;
    }
    
  } )
  .then(data => {
    // پاسخ از Backend را در اینجا پردازش کنید
    console.log(data);
  })
  .catch(error => console.error('Error:', error));

  if(url == '/dashbord/saleProduct'){
    var userInput = window.prompt(`مقدار تخفیف:${name}
    مقدار تخفیف جدید را وارد کنید:`);
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // درخواست Authorization را با مقدار ذخیره شده از متغیر جاوااسکریپت ارسال کنید
      'Authorization': productId
    },
    
    // ممکن است نیاز باشد داده‌های اضافی را نیز ارسال کنید
    body: JSON.stringify({
      // productId: productId,
      sale: userInput,
      // ممکن است دیگر داده‌ها نیز بخواهید ارسال کنید
      // ...
    })
  })
  .then(response =>{
    response.json();
    console.log(response);
    if(response.status == 200){
      window.location.href =redirct;
      
    }
    
  } )
  .then(data => {
    // پاسخ از Backend را در اینجا پردازش کنید
    console.log(data);
  })
  .catch(error => console.error('Error:', error));
  alert(` تغییر اعمال شد`); 
  }
  if(url == '/dashbord/editCategory'){
    var userInput = window.prompt(`میحواهید نام دسته بندی ${name} به چی تغییر دهید ؟`);
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // درخواست Authorization را با مقدار ذخیره شده از متغیر جاوااسکریپت ارسال کنید
      'Authorization': productId
    },
    
    // ممکن است نیاز باشد داده‌های اضافی را نیز ارسال کنید
    body: JSON.stringify({
      // productId: productId,
      name: userInput,
      // ممکن است دیگر داده‌ها نیز بخواهید ارسال کنید
      // ...
    })
  })
  .then(response =>{
    response.json();
    console.log(response);
    if(response.status == 200){
      window.location.href =redirct;
      
    }
    
  } )
  .then(data => {
    // پاسخ از Backend را در اینجا پردازش کنید
    console.log(data);
  })
  .catch(error => console.error('Error:', error));
  alert(` تغییر اعمال شد`); 
  }
  if(url == '/dashbord/addCategorymin'){
    var userInput = window.prompt(` نام دسته بندی  را که میخواهید اضافه کنید را وارد کنید`);
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // درخواست Authorization را با مقدار ذخیره شده از متغیر جاوااسکریپت ارسال کنید
      'Authorization': productId
    },
    
    // ممکن است نیاز باشد داده‌های اضافی را نیز ارسال کنید
    body: JSON.stringify({
      // productId: productId,
      name: userInput,
      catid:productId
      // ممکن است دیگر داده‌ها نیز بخواهید ارسال کنید
      // ...
    })
  })
  .then(response =>{
    response.json();
    console.log(response);
    if(response.status == 200){
      window.location.href =redirct;
      
    }
    
  } )
  .then(data => {
    // پاسخ از Backend را در اینجا پردازش کنید
    console.log(data);
  })
  .catch(error => console.error('Error:', error));
  alert(` تغییر اعمال شد`); 
  }
}


function getsingel(productId,url){
  console.log("hi");
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // درخواست Authorization را با مقدار ذخیره شده از متغیر جاوااسکریپت ارسال کنید
      'Authorization': productId
    },
    body:JSON.stringify({ productId })
  })
  .then(response =>{
    response.json();
    
  } )  
}