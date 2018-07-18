import React, { Component } from 'react';
import Buttons from  './Components/Buttons.js';
import {Random} from './Components/RandomPageStart.js';
import {CharacterDetails} from './Components/CharacterDetails.js'
import './App.css';

const baseURL = 'https://rickandmortyapi.com/api/character/'

//in case character is not found in search
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
      //data is where we store the json results from the different fetch calls
      data : [],
      //view will set which conditional rendering is shown based on funciton calls
      view: 'random',
      //binding user search parameters
      searchName: '',
      //for loading specific character information
      detailedCharacterId: '',
      //in case character isn't found
      failedName: ''
    }
  }
//generates a random list of character to look at. Called on page load as well as Surprise Me button
  randomList() {
    console.log('looking for random peeps');
    fetch(`${baseURL} ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}, ${Math.floor(Math.random() * 100 + 1)}`)
    .then((response) => {
      //fetch wasn't throwing error automatically so checking to see if there's an issue and accounting for it
      if(!response.ok) {
        this.setState({failedName: 'This collection of idiots', view: 'notFound'});
        throw Error (response.statusText)
      }
      return response;
    })
    //handling data and setting state/conditional rendering
    .then(response => response.json())
    .then((data) => {
        this.setState({data: data})
        this.setState({view: 'random'})
      })
    .catch(error => console.log('pasring failed', error))
  }
//loading random characters on page load
  componentDidMount() {
    this.randomList();
  }
//binding search text to state
  updateSearchName(e) {
    this.setState({searchName: e.target.value})
  }
//searching for single character based on user search.  Can return multiple results
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
//loading specific character information. Shared by clicking individual characters and random character button.
  specificCharacter(type) {
    let urlHelper;
    //setting the url helper based on which function is called
    if(type.type === 'random') {
      urlHelper = Math.floor(Math.random() * 100 + 1);
      console.log(urlHelper);
    } else  {
      urlHelper = type.type;
      console.log(`${baseURL}${urlHelper}`);
    }
    fetch(`${baseURL}${urlHelper}`)
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
      this.setState({view: 'specificCharacter'})
      this.setState({data: data})
    })
    .catch((error) => {
      console.log(error);
    })
  }
//capturing the individual id to search specific character information
  detailedIdUpdate(id) {
    this.setState({detailedCharacterId: id});
    this.specificCharacter({type: id})
    this.setState({view: 'randomCharacter'});
  }

  render() {
    let viewState = this.state.view;
    let view;
    //conditional rendering based on which view we want
    switch(viewState){
      //on page load and surprise me button views
        case 'random':
            view = <Random data={this.state.data} title="Rando Characters" id={this.detailedIdUpdate.bind(this)} /> ;
            break;
      //searching for a character. Because it can return multiple results it share the Random view
        case 'singleSearch':
          view = <Random data={this.state.data} title={"List of characters named " + this.state.failedName} id={this.detailedIdUpdate.bind(this)} />
          break;
      //called by both random character button and by clicking on specific character from list
        case 'specificCharacter':
          view = <CharacterDetails data={this.state.data}/>
          break;
      //in case the character isn't found it lets user know
        case 'notFound':
          view = <NotFound name={this.state.failedName}/>
          break;
          //hopefully never called....
        default:
            view = <h1>Not working</h1>
    }
    return (
      <div className="rmbody">
        <div className="container">
          <Buttons nameField={this.updateSearchName.bind(this)} search={this.singleSearch.bind(this)} randomCharacter={this.specificCharacter.bind(this)} randomList={this.randomList.bind(this)}  />
        </div>
      {view}
      </div>
    )
  }
}

export default App;
