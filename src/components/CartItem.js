
const CartItem = (props)=>{

  return(
    <div className="cart-item">
      <img src={props.url} alt=""/>
      <div>{props.name}</div>
      <div className="quantity">{props.quantity}</div>
    </div>
  )

};

export default CartItem;
