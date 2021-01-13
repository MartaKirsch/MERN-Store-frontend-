import AddressesListItem from './AddressesListItem.js';
import '../styles/addressesListItem.css';
import {Link} from 'react-router-dom';

const AddressesList = ({addresses})=>{

  let counter=0;

  let display = addresses.length!==0 ? (
    addresses.map((a) => {
      counter++;
      return (<AddressesListItem key={a._id} id={a._id} counter={counter} name={a.name+" "+a.surname} city={a.city} street={a.street+" "+a.homeNumber} postalCode={a.postalCode}/>)
    })

  ) : (<></>);

  return(
    <>
    {display}
    <Link to="/add-address" className="address add">
      <div className="address__id">+</div>
      <div className="address__add">Add New Address</div>
    </Link>
    </>
  );
};

export default AddressesList;
