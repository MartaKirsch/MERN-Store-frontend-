import React from 'react';
import '../styles/orderListItem.css';
import {Link} from 'react-router-dom';

const OrderListItem=(props)=>{

  let date = "";
  let reg = /\d{4}-\d{1,2}-\d{1,2}/;
  date = props.date.match(reg);

  let address ="/account/order/"+props.id;

  //<div className="order__id">{props.id}</div>
  return(
    <Link className="order" to={address}>
      <div className="order__date">{date}</div>
      <div className="order__price">{props.price}</div>
    </Link>
  )

};

export default OrderListItem;
