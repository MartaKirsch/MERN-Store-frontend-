import React from 'react';
import axios from 'axios';
import '../styles/login.css';

class Account_LogIn extends React.Component
{
  state={
    action:"/api/logIn",
    linkMssg:"You don't have an account yet? Click here to register!",
    flags:[0,0]
  }

  handleSubmitLogin = (e) => {
    e.preventDefault();

    let login = document.querySelector('#logInWrapper input[name="login"]').value;
    let password = document.querySelector('#logInWrapper input[name="password"]').value;
    let data={login,password};

    //console.log(data);


    axios.post('/api/logIn',data).then(res=>{
      //console.log(res.data);
      if(res.data.input!=="none")
      {
        let input=document.querySelector('input[name="'+res.data.input+'"]');
        let mssg = res.data.mssg;

        input.nextSibling.innerHTML=mssg;
        input.nextSibling.style.visibility="visible";
      }
      else {
        window.location="/account";
      }
    });

  }

  handleSubmitRegister = (e) => {
    e.preventDefault();

    //check inputs
    let isOK=true;
    this.state.flags.forEach((flag) => {
      if(flag===0)
      {
        isOK=false;
      }
    });

    //if everything is ok
    if(isOK)
    {
      let login = document.querySelector('#logInWrapper input[name="login"]').value;
      let password = document.querySelector('#logInWrapper input[name="password"]').value;
      let data={login,password};

      axios.post('/api/register', data).then(res=>{
        //console.log(res.data);
        window.location="/account";
      })
    }
    //if not, invoke functions for checking the inputs
    else {
      this.handleBlurLogin();
      this.handleBlurPasswd();
    }


  }

  handleLinkClick = (e)=>{
    if(this.state.linkMssg==="You don't have an account yet? Click here to register!")
    {
      this.setState({linkMssg:"You already have an account? Click here to log in!"});
    }
    else
    {
      this.setState({linkMssg:"You don't have an account yet? Click here to register!"});
    }

    let errormssgs = document.querySelectorAll('.errormssg');
    for(let i=0;i<errormssgs.length;i++)
    {
      errormssgs[i].style.visibility='hidden';
    }

  }

  handleBlurLogin = ()=>{
    let login = document.querySelector('input[name="login"]');

    if(login.value==="")
    {
      login.nextSibling.innerHTML="This field cannot be empty!";
      login.nextSibling.style.visibility="visible";

      let arr = this.state.flags;
      arr[0]=0;
      this.setState({flags:arr});
    }
    else {
      axios.post("/api/checkIfExists", {login: login.value}).then(res=>{
        if( res.data.exists)
        {
          login.nextSibling.innerHTML="This login is already in use!";
          login.nextSibling.style.visibility="visible";

          let arr = this.state.flags;
          arr[0]=0;
          this.setState({flags:arr});
        }
        else {
          let arr = this.state.flags;
          arr[0]=1;
          this.setState({flags:arr});
        }
      });
    }


  }

  handleFocus = (e)=>{
    e.target.nextSibling.style.visibility="hidden";
  }

  handleBlurPasswd = ()=>{
    let reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    let password = document.querySelector('input[name="password"]');

    //if password has one uppercase letter, one lowercase and one num
    if(password.value.match(reg))
    {
      let arr = this.state.flags;
      arr[1]=1;
      this.setState({flags:arr});
    } //if it doesn't
    else {
      password.nextSibling.innerHTML="One upper- and lowercase letter and one number is required!";
      password.nextSibling.style.visibility="visible";

      let arr = this.state.flags;
      arr[1]=0;
      this.setState({flags:arr});
    }
  }

  render()
  {
    let form = this.state.linkMssg==="You don't have an account yet? Click here to register!" ? (
      <form onSubmit={this.handleSubmitLogin}>
        <div className="cell">
          <input type="text" autoComplete="off" name="login" placeholder="Enter your login" onFocus={this.handleFocus}/>
          <div className="errormssg">This username is already in use!</div>
        </div>
        <div className="cell">
          <input type="password" name="password" placeholder="Enter your password" onFocus={this.handleFocus}/>
          <div className="errormssg">This username is already in use!</div>
        </div>
        <button>Log in!</button>
      </form>
      ) : (
        <form onSubmit={this.handleSubmitRegister}>
          <div className="cell">
            <input type="text" autoComplete="off" name="login" placeholder="Login" onBlur={this.handleBlurLogin} onFocus={this.handleFocus}/>
            <div className="errormssg">This username is already in use!</div>
          </div>
          <div className="cell">
            <input type="password" name="password" placeholder="Password" onBlur={this.handleBlurPasswd} onFocus={this.handleFocus}/>
            <div className="errormssg">This username is already in use!</div>
          </div>

          <button>Register!</button>
        </form>
      )

    return(
      <div id="logInWrapper">
        {form}
        <div id="registerLink" onClick={this.handleLinkClick}>
          {this.state.linkMssg}
        </div>
      </div>
    )
  }
}


export default Account_LogIn;
