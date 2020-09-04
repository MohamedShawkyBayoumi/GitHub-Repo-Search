import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
// import UserCard from './components/UserCard';
import UserCard from './components/UserCard';
import RepositoryCard from './components/RepositoryCard';

const API = 'https://api.github.com';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('mohamed')

  const searchUsers = async () => {
    try {
      let res = await axios.get(`${API}/search/users?q=${value}+in:user`);
      setData(res.data.items);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const searchRepositories = async () => {
    try {
      let res = await axios.get(`${API}/search/repositories?q=${value}`);
      setData(res.data.items);
      console.log(res.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    searchRepositories();
  }, []);

  return (
    <div>
      <Header />
      <div className="cards-wrapper">
        {data.length > 0 && data.map((info, i) => (
          <RepositoryCard {...info} key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
