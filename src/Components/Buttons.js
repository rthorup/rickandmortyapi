import React, { Component } from 'react';

/*generates the static buttons with modal to search specific characters. Was going for practice passing props up through multiple layers*/

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render(){
  return(
    <div className="row text-center">
      <div className="col-md-4 ">
        <button type="button" className="btn btn-success my-2" data-toggle="modal" data-target="#findModal">Find Character</button>
      </div>
      <div className="col-md-4 ">
        <button className="btn btn-success my-2" onClick={this.props.randomCharacter}>Random Character</button>
      </div>
      <div className="col-md-4">
        <button className="btn btn-success my-2">Surprise Me</button>
      </div>

      <div className="modal fade" id="findModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-right" id="exampleModalLabel">Who you looking for?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input type="text" onChange={this.props.nameField} className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={this.props.search} data-dismiss="modal">Search</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
}

export default Buttons;
