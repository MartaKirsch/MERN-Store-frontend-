import React from 'react';
import axios from 'axios';
import AccountLogIn from './AccountLogIn.js';
import AccountView from './AccountView.js';

class Account extends React.Component{

  state={
    logged:false,
    happy:true
  }

  componentDidMount()
  {
    axios.get('/api/checkLogIn').then(res=>{
      //console.log(res.data);
      this.setState(res.data);
      //console.log(this.props);
    })
  }

  updateState = ()=>{
    this.setState({logged:true});

    //if logged in correctly and its a redirect, go back to cart
    if(sessionStorage.getItem('redirect'))
    {
      sessionStorage.removeItem('redirect');
      this.props.history.push('/cart');
    }
  }


  render()
  {
    let display = this.state.logged===false ? <AccountLogIn updateState={this.updateState}/> : <AccountView/>



    return(
      display
    )

  }

};


export default Account;
