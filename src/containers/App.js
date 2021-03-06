// import logo from './logo.svg';
import './App.css';
import CardList from '../components/CardList';
// import {robots} from './robots';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import React, {Component} from 'react';


class App extends Component {
  constructor() {
    super();
    this.state = {
      test:[],
      // test: robots,
      searchfield:''
    }
  }

  componentDidMount(){
    // console.log(this);
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response=>response.json())
    .then(users=>this.setState({test:users}));
  }
  


  onSearchChange = (event) => {
    this.setState({searchfield:event.target.value});
    // console.log(event.target.value);
  }

  render() {
    const {test,searchfield} = this.state;
    const filteredRobots = test.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if(!test.length) {
      return <h1>Loading...</h1>;
    } 
    else{
      return(
        <div className = 'tc'>
          <h1 className = 'f1'>Robofriends</h1>
          <SearchBox searchChange = {this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots = {filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
  }
}


export default App;
