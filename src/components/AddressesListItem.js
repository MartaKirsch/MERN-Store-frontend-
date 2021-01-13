import React from 'react';
import {Link} from 'react-router-dom';

const AddressesListItem=(props)=>{

  const path=`/add-address/${props.id}`;
  
  return(
    <Link to={path} className="address" dataset-id={props.id}>
      <div className="address__id">{props.counter}.</div>
      <div className="address__content">
        <div className="address__content__left">
          <div className="address__row">{props.name}</div>
        </div>
        <div className="address__content__right">
          <div className="address__row">{props.city}</div>
          <div className="address__row">{props.street}</div>
          <div className="address__row">{props.postalCode}</div>
        </div>
      </div>
    </Link>
  )

};

export default AddressesListItem;
