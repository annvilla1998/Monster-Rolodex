import './App.css';
import { Component } from 'react'
import { useState,useEffect } from "react"
import CardList from './components/card-list/card-list.component.jsx'
import SearchBox from './components/search-box/search-box.component.jsx'


const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => setMonsters(users))
  },[])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });

    setFilteredMonsters(newFilteredMonsters);
  },[monsters, searchField]);


  const onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase()
    setSearchField(searchField)
  }

  return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters' 
        className='search-box'/>
        <CardList monsters={filteredMonsters}/>
      </div>
  )
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(users => this.setState(
//       () => {
//         return {monsters:users}
//       }, 
//       ()=> {
//         console.log(this.state)
//       }))
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase()
//     this.setState(() => {
//       return { searchField }
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className='search-box'/>
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
