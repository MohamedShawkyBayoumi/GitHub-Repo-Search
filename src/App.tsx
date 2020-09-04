import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
import UserCard, { UsersPropsTypes } from './components/UserCard';
import RepositoryCard from './components/RepositoryCard';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from './reducers/global';
import { getUsers, getRepositories, clearUsers, clearRepositories } from './actions/global';
import { debounce } from 'lodash';

const API = 'https://api.github.com';

const App: React.FC = () => {
  const [value, setValue] = useState<string>(''),
        [type, setType] = useState<string>('Users'),
        [loading, setLoading] = useState(false);

  const debouncedGetUsers = useCallback(debounce((value) => searchUsers(value), 500), []);
  const debouncedGetRepositories = useCallback(debounce((value) => searchRepositories(value), 500), []);

  const users = useSelector<GlobalState, GlobalState['users']>(state => state.users);
  const repositories = useSelector<GlobalState, GlobalState['repositories']>(state => state.repositories);
  const dispatch = useDispatch();

  console.log('users from store', users);

  const searchUsers = async (keyword: string) => {
    try {
      setLoading(true);
      let res = await axios.get(`${API}/search/users?q=${keyword}+in:user`);
      
      let data = res.data.items.map(({
        avatar_url,
        login,
        html_url
      }: UsersPropsTypes) => ({
        avatar_url,
        login,
        html_url
      }))

      dispatch(clearRepositories())
      dispatch(getUsers(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const searchRepositories = async (keyword: string) => {
    try {
      setLoading(true);
      let res = await axios.get(`${API}/search/repositories?q=${keyword}`);
      dispatch(clearUsers())
      dispatch(getRepositories(res.data.items));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let keyword = e.target.value;
    setValue(keyword);
    if(keyword.length >= 3){
      type == 'Users' ? debouncedGetUsers(keyword) : debouncedGetRepositories(keyword);
    }
  }

  const onSelectType = (e: React.FormEvent<HTMLSelectElement>): void => {
    let selectedValue = e.currentTarget.value;
    setType(selectedValue);

    if(value.length >= 3){
      selectedValue == 'Users' ? debouncedGetUsers(value) : debouncedGetRepositories(value);
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
        ) : (
          <>
            {
              users.length > 0 && users.map((info: any, i) => (
                <UserCard {...info} key={i} />
              ))
            }
    
            {
              repositories.length > 0 && repositories.map((info: any, i) => (
                <RepositoryCard {...info} key={i} />
              ))
            }
          </>
        )}        
      </div>
    </div>
  );
}

export default App;
