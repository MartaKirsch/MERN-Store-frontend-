import React from 'react';
import '../styles/accountView.css';
import OrderList from './OrderList.js';
import AddressesList from './AddressesList.js';
import axios from 'axios';

class AccountView extends React.Component{
  state={
    show:"orders",
    orders:[],
    addresses:[]
  };

  componentDidMount()
  {
    if(!sessionStorage.getItem('redirect'))
    {
      axios.get('/api/loadOrders').then(res=>{
        //console.log(res.data);
        this.setState({
          ...this.state,
          orders:res.data
        });
      });
      axios.get('/api/loadAddresses').then(res=>{
        //console.log(res.data);
        this.setState({
          ...this.state,
          addresses:res.data
        });
      })
    }
  }

  handleChangeShow = (e)=>{
    document.querySelectorAll('.accountView__sidebarItem').forEach((item) => {
      item.classList.remove('clicked')
    });
    e.target.classList.add('clicked');
    this.setState({...this.state,show:e.target.innerHTML.toLowerCase()})
  }


  render()
  {
    let display = this.state.show==="orders" ? (
      <OrderList orders={this.state.orders}/>
    ) : (<AddressesList addresses={this.state.addresses}/>);

    return(
      <div className="accountWrapper">
        <h1>{this.props.login}</h1>
        <div className="accountView__main">
          <div className="accountView__sidebar">
            <div className="accountView__sidebarItem clicked" onClick={this.handleChangeShow}>Orders</div>
            <div className="accountView__sidebarItem" onClick={this.handleChangeShow}>Addresses</div>
            <div className="accountView__sidebarItem logout" onClick={this.props.logout}>Log Out</div>
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
