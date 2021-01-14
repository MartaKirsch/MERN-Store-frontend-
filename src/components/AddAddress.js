import axios from 'axios';
import {useEffect, useState} from 'react';
import '../styles/addAddress.css';

const AddAddress = (props)=>{

  const [saying,setSaying]=useState("add a new");
  const [flags,setFlags]=useState([0,0,0,0,0,0]);
  const [address, setAddress]=useState({name:"",surname:"",city:"",street:"",homeNumber:"",postalCode:""});

  useEffect(()=>{

    axios.get('/api/checkLogIn').then(res=>{
      if(!res.data.logged){
        props.history.push('/');
      }
      let user=res.data.account.login;

      if(props.match.params.id)
      {
        axios.get(`/api/getAddress/${props.match.params.id}`).then(res=>{

          if(res.statusText!=="OK"){
            throw Error("couldn't fetch data from this resource")
          }
          if(res.data.user!==user)
          {
            throw Error("this account does not have this order")
          }
          setAddress(res.data);
          setFlags([1,1,1,1,1,1]);
        }).catch(err=>{
          console.log(err.message);
          props.history.push('/account');
        });
        setSaying("edit your");
      }

    });


  },[props.history,props.match.params.id]);

  const handleCheckInput = (e)=>{
    const reg = e.target.dataset.id==="4" ? (/^\d{1,4}(\/\d{1,4}){0,2}$/): ((e.target.dataset.id==="5") ? ((/^\d{4,10}$/)) : (/^([a-z]|[A-Z]|\s){1,}$/));

    const newFlags=flags;

    const input = document.querySelectorAll('form.addAddress input[type="text"]')[e.target.dataset.id];
    input.classList.remove('wrong');

    document.querySelector('form.addAddress input[type="submit"]').classList.remove('wrong');

    if(e.target.value.match(reg))
    {
      newFlags[e.target.dataset.id]=1;
    }
    else
    {
      newFlags[e.target.dataset.id]=0;
      input.classList.add('wrong');
    }

    setFlags(newFlags);

  };

  const handleSubmit = (e)=>{
    e.preventDefault();

    //check flags
    let flagsOk=true;
    flags.forEach(flag => {
      if(!flag){
        flagsOk=false;
      }
    });

    if(flagsOk){
      let data = {};
      document.querySelectorAll('.addAddress input[type="text"]').forEach(input=>{
        data[input.name]=input.value;
      });

      const path = (props.match.params.id) ? ('/api/updateAddress/'+props.match.params.id) : ('/api/addAddress');

      axios.post(path,data).then(res=>{
        if(res.statusText!=="OK")
        {
          throw Error("couldn't fetch data from this resource")
        }
        else
        {
          props.history.push('/account');
        }
      }).catch(err=>{
        console.log(err.message);
      });
    }

    else
    {
      document.querySelector('form.addAddress input[type="submit"]').classList.add('wrong');
    }

  };

  const handleToggleOptions = (e)=>{
    document.querySelector('.checkDelete').classList.toggle('visible');
  };

  const handleDeleteAddress=(e)=>{
    axios.get(`/api/deleteAddress/${props.match.params.id}`).then(res=>{
      if(res.statusText!=="OK")
      {
        throw Error("couldn't delete this address");
      }
      props.history.push('/account');
    }).catch(err=>console.log(err.message))
  };

  return(<>
    <h1>Here you can {saying} address</h1>
    {props.match.params.id&&<button className="deleteButton" onClick={handleToggleOptions}>Delete This Address</button>}
    <div className="checkDelete">
      <div>Are you sure you want to delete this address?</div>
      <div className="buttons">
        <button className="yes" onClick={handleDeleteAddress}>Yes</button>
        <button className="no" onClick={handleToggleOptions}>No</button>
      </div>
    </div>
    <form className="addAddress" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Your name" onChange={handleCheckInput} data-id="0" defaultValue={address.name}/>
      </div>

      <div className="row">
        <label htmlFor="surname">Surname</label>
        <input type="text" name="surname" placeholder="Your surname" onChange={handleCheckInput} data-id="1" defaultValue={address && address.surname}/>
      </div>

      <div className="row">
        <label htmlFor="city">City</label>
        <input type="text" name="city" placeholder="Your city" onChange={handleCheckInput} data-id="2" defaultValue={address.city}/>
      </div>

      <div className="row">
        <label htmlFor="street">Street</label>
        <input type="text" name="street" placeholder="Your street" onChange={handleCheckInput} data-id="3" defaultValue={address.street}/>
      </div>

      <div className="row">
        <label htmlFor="homeNumber">Home number</label>
        <input type="text" name="homeNumber" placeholder="Your home number" onChange={handleCheckInput} data-id="4" defaultValue={address.homeNumber}/>
      </div>

      <div className="row">
        <label htmlFor="postalCode">Postal code</label>
        <input type="text" name="postalCode" placeholder="Your postal code" onChange={handleCheckInput} data-id="5" defaultValue={address.postalCode}/>
      </div>

      <input type="submit" value="Add"/>
    </form>
    </>)

}

export default AddAddress;
