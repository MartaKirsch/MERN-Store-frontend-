import React from 'react';
import '../styles/accountView.css';
import Order from './Order.js';
import axios from 'axios';

class AccountView extends React.Component{
  state={
    show:"orders",
    orders:[]
  };

  componentDidMount()
  {
    axios.get('/api/loadOrders').then(res=>{
      //console.log(res.data);
      this.setState({
        ...this.state,
        orders:res.data
      });
    })
  }

  render()
  {
    let display = this.state.show==="orders" && this.state.orders.length!==0 ? (
      this.state.orders.map((order) => {
        return (<Order key={order._id} id={order._id} price={order.price} date={order.date} />)
      })

    ) : (<h2>No orders yet!</h2>);

    return(
      <div className="accountWrapper">
        <h1>{this.props.login}</h1>
        <div className="accountView__main">
          <div className="accountView__sidebar">
            <div className="accountView__sidebarItem clicked">Orders</div>
            <div className="accountView__sidebarItem">Addresses</div>
          </div>
          <div className="accountView__content">
            {display}
          </div>
        </div>
      </div>
    )
  }
};


export default AccountView;
