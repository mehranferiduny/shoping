const Basket = require("../models/Basket");
const Products = require("../models/Products");
const User = require("../models/Users");

exports.addProToShop = async (data, socket) => {
  try {
    const user = await Basket.findOne({ userId: data.userId });

    if (!user) {
      //! Add newuser bascket
      await Basket.create(data);
    } else {
      //! Add product to basket
      const idproducs = [];
      const newproduct = data.product.id;
      for (let i = 0; i < user.product.length; i++) {
        idproducs.push(user.product[i].id);
      }
      const isMach = idproducs.find((e) => {
        return e == newproduct;
      });
      if (isMach == undefined) {
        user.product.push(data.product);
        await user.save();
        let productID = [];
        for (let i of user.product) {
          productID.push(i);
        }
        const obj = productID.map((o) => {
          return o.id;
        });
        socket.emit("addsecses");
        const product = await Products.find({ _id: obj });
        const item = { user: user, product: product };
        socket.emit("item", item);
      } else {
        //! Add prodact but add befor produact
        socket.emit("addbefor");
        let productID = [];
        for (let i of user.product) {
          productID.push(i);
        }
        const obj = productID.map((o) => {
          return o.id;
        });
        const product = await Products.find({ _id: obj });
        const item = { user: user, product: product };
        socket.emit("item", item);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.removeItem = async (data, socket) => {
  try {
    const bs = await Basket.findOne({ userId: data.userId });

    let bascket = [];
    for (let i of bs.product) {
      bascket.push(i);
    }

    const index = bascket.findIndex((e) => e.id == data.productId);
    if (index > -1) {
      bascket.splice(index, 1);
    }

    bs.product = bascket;
    await bs.save();

    let productID = [];
    for (let i of bs.product) {
      productID.push(i);
    }
    const obj = productID.map((o) => {
      return o.id;
    });
    const product = await Products.find({ _id: obj });
    const item = { user: bs, product: product };

    socket.emit("item", item);
  } catch (err) {}
};

exports.like = async (data, socket) => {
  try {
    if (!data.userId) {
      socket.emit("dontUser");
    }
 
    const user = await User.findById(data.userId);
  
    

   
    if (user.like.length == 0) {
      user.like.push(data.id);
      await user.save();
      socket.emit("likeSecses");
    } else {
      const idlike = [];
      const newlike= data.id;

      for(let i=0; i < user.like.length; i++ ){
        idlike.push({_id:user.like[i]._id});
      }
      const idlike2=[]
      for(let i of idlike){
        idlike2.push(i._id)
      }
   
      const isMach=idlike2.find(e=>{
        return e == newlike;
      })
      if(isMach == undefined){
        user.like.push(newlike);
       await user.save();
        socket.emit("likeSecses");
      }else{

        const index = idlike.findIndex((e) => e._id == newlike);
        if (index > -1) {
          idlike.splice(index, 1);
        }
        user.like=idlike;
        await user.save();
        socket.emit("dislikeSecses");

    
      
      }
     
      
     }
  } catch (err) {
    console.log(err);
  }
};

exports.countNumberplus= async(data)=>{
  try {
    
    const basket=await Basket.findById(data.basketId)

    basket.product.forEach(e=>{
      if(e.id == data.prodactId){
        e.number=parseInt(e.number)+1
      }
    })
    await basket.save();

    
  } catch (err) {
    console.log(err)
  }
}
exports.countNumbermin= async(data)=>{
  try {
    
    const basket=await Basket.findById(data.basketId)

    basket.product.forEach(e=>{
      if(e.id == data.prodactId){
        if(parseInt(e.number) > 1){
        e.number=parseInt(e.number)-1
      }
    }
    })
    await basket.save();

    
  } catch (err) {
    console.log(err)
  }
}
