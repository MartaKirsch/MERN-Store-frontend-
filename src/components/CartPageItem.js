import { Link } from 'react-router-dom';

const CartItem = (props)=>{

  return(
    <div className="cartpage-item" >
      <img src={props.item.url} alt=""/>
      <div><Link to="/">{props.item.name}</Link></div>
      <button onClick={()=>{props.removeFromCart(props.item._id)}}>-</button>
      <div className="quantity">{props.item.quantity}</div>
      <button onClick={()=>{props.addToCart(props.item._id)}}>+</button>
    </div>
  )

};

export default CartItem;
