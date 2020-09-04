import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
// import UserCard from './components/UserCard';
import UserCard from './components/UserCard';
import RepositoryCard from './components/RepositoryCard';

const API = 'https://api.github.com';

const App: React.FC = () => {
  const [data, setData] = useState([]),
        [value, setValue] = useState<string>(''),
        [type, setType] = useState<string>('Users'),
        [loading, setLoading] = useState(false);

  const searchUsers = async (keyword: string) => {
    try {
      setLoading(true);
      setData([]);
      let res = await axios.get(`${API}/search/users?q=${keyword}+in:user`);
      setData(res.data.items);
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const searchRepositories = async (keyword: string) => {
    try {
      setLoading(true);
      setData([]);
      let res = await axios.get(`${API}/search/repositories?q=${keyword}`);
      setData(res.data.items);
      console.log(res.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let keyword = e.target.value;
    setValue(keyword);
    if(keyword != ''){
      setData([]);
      type == 'Users' ? searchUsers(keyword) : searchRepositories(keyword);
    }
  }

  const onSelectType = (e: React.FormEvent<HTMLSelectElement>): void => {
    let selectedValue = e.currentTarget.value;
    setType(selectedValue);

    if(value != ''){
      setData([]);
      selectedValue == 'Users' ? searchUsers(value) : searchRepositories(value);
    }
  }

  return (
    <div>
      <Header
        value={value}
        type={type}
        onChange={onChange}
        onSelectType={onSelectType}
      />
      <div className="cards-wrapper">
        {loading ? (
          <span>Loading...</span>
        ) : 
          type == 'Users' ? 
            data.length > 0 && data.map((info, i) => (
              <UserCard {...info} key={i} />
            ))
          :
            data.length > 0 && data.map((info, i) => (
              <RepositoryCard {...info} key={i} />
            ))
        
        }
        
      </div>
    </div>
  );
}

export default App;
