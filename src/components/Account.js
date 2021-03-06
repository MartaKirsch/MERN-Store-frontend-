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

  reload = ()=>{
    this.props.history.push('/account');
  }


  render()
  {
    let display = this.state.logged===false ? <AccountLogIn reload={this.reload}/> : <AccountView/>
    return(
      display
    )
  }

};


export default Account;
