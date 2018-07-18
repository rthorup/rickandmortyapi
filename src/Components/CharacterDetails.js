import React from 'react';
//function to show specific character details.  Shared by clicking character as well as random character function
export function CharacterDetails(props) {
  return(
  <div className="container my-4">
    <div className="row align-items-center col align-self-center justify-content-center">
      <div className="col-6 text-center characterSet">
        <h1 className="mt-3">{props.data.name}</h1>
        <img src={props.data.image} className="rounded mx-auto my-2 photo" alt={props.data.name}/>
        <h4>Species: {props.data.species}</h4>
        <h4>Gender: {props.data.gender}</h4>
        <h4>Status: {props.data.status}</h4>
      </div>
    </div>
  </div>
  )
}
