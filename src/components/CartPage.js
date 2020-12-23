import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/cartPage.css';
import { connect } from 'react-redux';
import CartPageItem from './CartPageItem.js';
import itemsActions from '../actions/itemsActions.js';

class Cart extends React.Component{
  addToCart = (id) => {
    axios.post('/api/getSingleItem', {id}).then(res=>{
      //console.log(res.data);
      this.props.addItemsToCart(res.data);
    });
  };

  removeFromCart = (id) =>{
    axios.post('/api/getSingleItem', {id}).then(res=>{
      //console.log(res.data);
      this.props.removeItemsFromCart(res.data);
    });

  };

  handleFinalize = (e)=>{
    axios.get('/api/checkLogIn').then(res=>{
      console.log(res.data);

      if(res.data.logged)
      {

      }

      else {
        sessionStorage.setItem('redirect', 'true');
        this.props.history.push('/account');
      }
    })
  }

  render()
  {
    let sum=0;

    //generate cart items
    let items = this.props.items && this.props.items.length!==0 ? (
      this.props.items.map(item=>{
        sum+=item.price*item.quantity;
        return(
          <CartPageItem key={item._id} item={item} removeFromCart={this.removeFromCart} addToCart={this.addToCart}/>
        )
      })
    ) : (
      <div className="noItems">No items yet!</div>
    )

    let bottom = this.props.items && this.props.items.length!==0 ? (
      <div className="bottom">
        <div className="price">{sum}</div>
        <button onClick={this.handleFinalize} className="finalize">Make an Order</button>
      </div>
    ) : (
      <Link to='/' className="bottom">Go shopping!</Link>
    )

    return(
      <div id="cartPageWrapper">

        <h1>Your Cart</h1>
        {items}
        {bottom}
      </div>
    )
  }
};



const mapStateToProps = (state) =>{
  return {
    items: state.cart
  };

};
const mapDispatchToProps = (dispatch)=>{

  return{
    addItemsToCart:(item)=>{
      dispatch(itemsActions.addItemToCart(item));
    },
    removeItemsFromCart:(item)=>{
      dispatch(itemsActions.removeItemFromCart(item));
    },
    clearCart:()=>{
      dispatch({type:"CLEAR_CART"});
    }
  }

};


export default connect(mapStateToProps,mapDispatchToProps)(Cart);
