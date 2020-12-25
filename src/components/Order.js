import React from 'react';
import '../styles/order.css';
import axios from 'axios';

class Order extends React.Component{

  componentDidMount()
  {
    axios.get('/api/checkLogIn').then(res=>{

      let inOrderArray = false;
      res.data.account.orders.forEach((order) => {
        if(order._id===this.props.match.params.id)
        {
          inOrderArray=true;
        }
      });


      if(!res.data.logged || !inOrderArray)
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
