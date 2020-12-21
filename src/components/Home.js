import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import itemsActions from '../actions/itemsActions.js';

class Home extends React.Component{

  state = {
    items:[]
  };

  componentDidMount()
  {
    this.getItems();
  }

  getItems = () => {
    axios.get('/api/loaditems').then(res=>{
      if(res.data)
      {
        console.log(res.data);
        this.props.addItems(res.data);
        this.setState({items:res.data});
      }
    });
  };

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

  isInCart = (item) =>{

    let is = false;

    this.props.cart.forEach((c_item) => {
      if(c_item._id===item._id)
      {
        is=c_item.quantity;
      }
    });

    return is;
  }

  render()
  {
    const itemList= this.state.items.map(item=>{

      let button = this.isInCart(item) ? (
        <div className="addWrapper">
          <button onClick={()=>{this.removeFromCart(item._id)}}>-</button>
          <div className="quantity">{this.isInCart(item)}</div>
          <button onClick={()=>{this.addToCart(item._id)}}>+</button>
        </div>
        ) : (<button onClick={()=>{this.addToCart(item._id)}}>Add To Cart</button>)

      return(
        <div key={item._id} data-id={item._id} className="item">
          <div className="name">{item.name}</div>
          <img src={item.url} alt={item.name}/>
          <div className="price">{item.price}</div>
          {button}
        </div>
      )
    });
    return(
      <div className="main">
        <h1>Have fun shopping C:</h1>
        <div className="items">
          {itemList}
        </div>
      </div>
    )
  }

};

const mapStateToProps = (state)=>{
  return {
    items:state.items,
    cart:state.cart
  }
};

const mapDispatchToProps = (dispatch)=>{

  return{
    addItems:(items)=>{
      dispatch(itemsActions.addItems(items));
    },
    addItemsToCart:(item)=>{
      dispatch(itemsActions.addItemToCart(item));
    },
    removeItemsFromCart:(item)=>{
      dispatch(itemsActions.removeItemFromCart(item));
    }
  }

};

export default connect(mapStateToProps,mapDispatchToProps)(Home);
//export default Home;
