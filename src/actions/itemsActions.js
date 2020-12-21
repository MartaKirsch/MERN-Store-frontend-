const addItems = (items)=>{
  return{
    type:"ADD_ITEMS",
    items
  };
};

const addItemToCart = (item)=>{
  return{
    type:"ADD_CART_ITEMS",
    item
  };
};

const removeItemFromCart = (item)=>{
  return{
    type:"REMOVE_CART_ITEMS",
    item
  };
};


module.exports= {addItems,addItemToCart,removeItemFromCart};
