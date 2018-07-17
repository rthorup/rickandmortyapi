import React from 'react';

/*these functions help generate the random characters on page load*/

export function Character (props) {
  return(
  <div key={props.key} id={props.id} onClick={props.idUp.bind(this, props.id)}className="col-md-6 character text-center">
    <h3 className="text-center my-2">{props.name}</h3>
    <img src={props.photo} className="rounded mx-auto my-2 photo" alt={props.name}/>
  </div>
  )
}

export function Random (props) {
return(
    <div className="container characterSet my-4">
      <h1 className="text-center my-2">{props.title}</h1>
      <div className="row align-items-center">
        {
          props.data.map((char) => {
            return <Character key={char.id} id={char.id} name ={char.name} photo ={char.image} idUp={props.id} />
          })
        }
      </div>
    </div>
)
}
