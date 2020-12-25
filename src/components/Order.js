import React from 'react';
import '../styles/order.css';
import axios from 'axios';

class Order extends React.Component{

  componentDidMount()
  {
    axios.get('/api/checkLogIn').then(res=>{
      if(!res.data.logged || res.data.account.orders.length<this.props.match.params.id)
      {
        this.props.history.push('/account');
      }
    })
  }



  render()
  {
    return(
      <h1>order page {this.props.match.params.id}</h1>
    )
  }



};

export default Order;
