import React, { Component } from 'react';
import Buttons from  './Components/Buttons.js';
import {Random} from './Components/RandomPageStart.js';
import SpecificCharacter from './Components/SpecificCharacter.js';
import './App.css';

const baseURL = 'https://rickandmortyapi.com/api/character/'

function NotFound(props) {
  return(
    <div className="container mt-5">
      <div className="row">
        <h1>Sorry but {props.name} was not found. Try something not stupid this time...</h1>
      </div>
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data : [],
      view: 'random',
      searchName: '',
      detailedCharacterId: ''
    }
  }

  randomList() {
    fetch(`${baseURL} ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}`)
    .then((response) => {
      if(!response.ok) {
        this.setState({failedName: this.state.searchName, view: 'notFound'});
        throw Error (response.statusText)
      }
      return response;
    })
    .then(response => response.json())
    .then((data) => {
        this.setState({data: data})
        this.setState({view: 'random'})
      })
    .catch(error => console.log('pasring failed', error))
  }

  componentDidMount() {
    this.randomList();
  }

  updateSearchName(e) {
    this.setState({searchName: e.target.value})
  }

  singleSearch() {
    fetch(`${baseURL}?name=${this.state.searchName}`)
    .then((response) => {
      if(!response.ok) {
        this.setState({failedName: this.state.searchName, view: 'notFound'});
        throw Error (response.statusText)
      }
      return response;
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.results);

      this.setState({data: data.results})
      this.setState({view: 'singleSearch'});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  randomCharacter() {
    console.log('This is a rando character');
    fetch(`${baseURL}${Math.floor(Math.random() * 100 + 1)}`)
    .then((response) => {
      if(!response.ok) {
        this.setState({failedName: this.state.searchName, view: 'notFound'});
        throw Error (response.statusText)
      }
      return response;
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      this.setState({view: 'randomCharacter'})
      this.setState({data: data})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  detailedIdUpdate(id) {
    this.setState({detailedCharacterId: id})
  }

  render() {
    let viewState = this.state.view;
    let view;
    switch(viewState){
        case 'random':
            view = <Random data={this.state.data} title="Rando Characters" id={this.detailedIdUpdate.bind(this)} /> ;
        break;
        case 'singleSearch':
          view = <Random data={this.state.data} title={"List of characters named " + this.state.searchName} id={this.detailedIdUpdate.bind(this)} />
        break;
        case 'notFound':
          view = <NotFound name={this.state.failedName}/>
        break;
        default:
            view = <h1>Not working</h1>
    }
    return (
      <div className="rmbody">
        <div className="container">
          <Buttons nameField={this.updateSearchName.bind(this)} search={this.singleSearch.bind(this)} randomCharacter={this.randomCharacter.bind(this)}   />
        </div>
      {view}
      </div>
    )
  }
}

export default App;
