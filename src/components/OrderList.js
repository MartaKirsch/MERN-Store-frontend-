import OrderListItem from './OrderListItem.js';

const OrderList = ({orders})=>{

  let display = orders.length!==0 ? (
    orders.map(({_id,price,date}) => {
      return (<OrderListItem key={_id} id={_id} price={price} date={date} />)
    })

  ) : (<h2>No orders yet!</h2>);

  return(display);
};

export default OrderList;
