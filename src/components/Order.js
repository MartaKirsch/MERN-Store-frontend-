import React from 'react';
import '../styles/order.css';
import axios from 'axios';
import CartItem from './CartItem';

class Order extends React.Component{
  state={
    order:{},
    items:[]
  };
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
    }).then(()=>{
      axios.get(`/api/getOrder/${this.props.match.params.id}`).then(res=>{
        if(res.statusText!=="OK")
        {
          throw Error('could not fetch data from this resource');
        }
        this.setState({order:res.data});
      })
      .then(()=>{
        axios.post('/api/loadItemsFromOrder',{order:this.state.order}).then(res=>{
          if(res.statusText!=="OK")
          {
            throw Error('could not fetch data from this resource');
          }
          this.setState({...this.state,items:res.data});
        }).catch(err=>console.log(err.message));
      })
      .catch(err=>console.log(err.message));
    })
    .catch(err=>console.log(err.message));
  }



  render()
  {
    let sum=0;
    const itemsList = this.state.items && this.state.items.length!==0 ? (
      this.state.items.map(({_id,url,name,quantity,price})=>{
        sum+=parseInt(quantity)*parseInt(price);
        return(<CartItem key={_id} url={url} name={name} quantity={quantity}/>)
      })
    ) : (<h2>Loading...</h2>);
    console.log(sum);

    return(
      <>
        <h1>Order from {this.state.order.date && this.state.order.date.match(/\d{4}-\d{1,2}-\d{1,2}/)}</h1>
        <div className="orderWrapper">
          {itemsList}
          <div className="price">{sum!==0 && (Math.round(sum * 100) / 100).toFixed(2)+""}</div>
        </div>
      </>
    )
  }



};

export default Order;
