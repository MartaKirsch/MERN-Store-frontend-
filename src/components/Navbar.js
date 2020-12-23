import { Link, withRouter } from 'react-router-dom';
import cart from '../imgs/cart.png';
import React from 'react';
import CartItem from './CartItem.js';
import { connect } from 'react-redux';
import '../styles/cart.css';

class Navbar extends React.Component{

  handleMouseOver = (e)=>{
    const lists = document.getElementsByClassName('cart-list');
    const list = lists[0];

    list.style.display="flex";
  }

  handleMouseOut = (e)=>{
    const lists = document.getElementsByClassName('cart-list');
    const list = lists[0];

    list.style.display="none";
  }

  render(){
    let sum=0;
    let cartList = !this.props.cartItems||this.props.cartItems.length===0 ? (

      <div>No items yet!</div>

    ) : (
      this.props.cartItems.map(item=>{
        sum+=item.quantity*item.price;
        return(
          <CartItem key={item._id} url={item.url} name={item.name} quantity={item.quantity}/>
        )
      })
    );

    sum=Math.round((sum + Number.EPSILON) * 100) / 100;

    let button = !this.props.cartItems||this.props.cartItems.length===0 ? (

      <Link to='/'>Go shopping!</Link>

    ) : (
      <Link to='/cart'>Go to cart</Link>
    );

    let price = this.props.cartItems&&this.props.cartItems.length!==0 ? (
      <div className="cart-price">{sum}</div>
    ):(<div className="cart-price"></div>);


    return(

      <div className="navbar">
        <Link to='/'>Home</Link>
        <Link to='/account'>Account</Link>
        <Link to='/cart'>Cart</Link>
        <div className="cart-wrapper">
          <img src={cart} alt="CART" className="cart" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/>

          <div className="cart-list" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
            {cartList}
            {price}
            {button}
          </div>
        </div>
      </div>

    )
  }

};

const mapStateToProps = (state)=>{
  return {
    cartItems:state.cart
  }
};

export default connect(mapStateToProps)(withRouter(Navbar));
