import './App.css';
import { useState,useEffect, ChangeEvent } from "react"
import SearchBox from './components/search-box/search-box.component'
import CardList from './components/card-list/card-list.component';
import { getData } from './utils/data.utils';

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      setMonsters(users)
    }

    fetchUsers();
  },[])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    setFilteredMonsters(newFilteredMonsters);
  },[monsters, searchField]);


  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
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


export default App;
