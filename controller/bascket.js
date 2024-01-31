
const Basket = require("../models/Basket");
const Products = require("../models/Products");

exports.addProToShop = async (data, socket) => {




  try {
    const user = await Basket.findOne({ userId: data.userId });
    
  
    
    if (!user) {
      //! Add newuser bascket
      await Basket.create(data);
    } else {
      //! Add product to basket
     const idproducs=[];
     const newproduct=data.product.id;
     for(let i=0;i<user.product.length;i++){
      idproducs.push(user.product[i].id)
     }  
     const isMach=idproducs.find(e=>{
      return e==newproduct
     })
     if(isMach==undefined){
      user.product.push(data.product)
      await user.save();
      let productID=[];
      for(let i of user.product)
      {
        productID.push(i)
      }
      const obj=productID.map( o =>{
        return o.id;
      })
       const product=await Products.find({_id:obj})
      const item={user:user,product:product}
      socket.emit("item",item)
     }else{
      //! Add prodact but add befor produact
      console.log("nooo");
     }



       
    }
   
  } catch (err) {
    console.log(err);
  }
};

exports.removeItem = async (data, socket) => {
 
  try {
     

    const bs = await Basket.findOne({ userId: data.userId });

    
    
     
    let bascket=[];
    for( let i of bs.product){
     bascket.push(i)
    }

    const index=bascket.findIndex(e=> e.id == data.productId);
    if(index > -1){
       bascket.splice(index,1)
    }

    bs.product=bascket;
    await bs.save();

    let productID=[];
    for(let i of bs.product)
    {
      productID.push(i)
    }
    const obj=productID.map( o =>{
      return o.id;
    })
    const product = await Products.find({ _id: obj });
    const item={user:bs,product:product};
    
    socket.emit("item", item);
 
  } catch (err) {}
};



