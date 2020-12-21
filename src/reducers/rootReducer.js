const initState={
  items:[],
  cart:[]
};

const rootReducer = (state = initState, action)=>{

  if(action.type==="ADD_ITEMS")
  {
    return {
      ...state,
      items: action.items
    };
  }

  else if(action.type==="ADD_CART_ITEMS")
  {
    let item = action.item;
    item.quantity = 1;
    let inCart = false;

    let cart = state.cart;
    cart.forEach((cItem) => {
      if(cItem._id===item._id)
      {
        cItem.quantity+=1;
        inCart=true;
      }
    });

    if(inCart)
    {
      return {
        ...state,
        cart:[...cart]
      };
    }
    else {
      return {
        ...state,
        cart:[...state.cart,item]
      };
    }

  }

  else if(action.type==="REMOVE_CART_ITEMS")
  {
    let cart = state.cart;
    let completeRemoval=false;
    let idToRemove=0;

    cart.forEach((item) => {
      if(item._id===action.item._id)
      {
        item.quantity-=1;
        if(item.quantity===0)
        {
          completeRemoval=true;
          idToRemove=item._id;
        }
      }
    });

    //if the items quantity=0, filter it out
    if(completeRemoval)
    {
      cart=cart.filter(item=>{
        return item._id!==idToRemove
      })
    }

    return{
      ...state,
      cart:[...cart]
    }


  }

  else {
    return {...state}
  }

};

export default rootReducer;
