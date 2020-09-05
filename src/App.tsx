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
        [errorMsg, setErrorMsg] = useState<boolean>(false),
        [total_count, setTotal_count] = useState<number>(1),
        [loading, setLoading] = useState(false);

  const debouncedGetUsers = useCallback(debounce((value) => searchUsers(value), 500), []);
  const debouncedGetRepositories = useCallback(debounce((value) => searchRepositories(value), 500), []);

  const users = useSelector<GlobalState, GlobalState['users']>(state => state.users);
  const repositories = useSelector<GlobalState, GlobalState['repositories']>(state => state.repositories);
  const dispatch = useDispatch();

  console.log('repositories from store', repositories);

  const searchUsers = async (keyword: string) => {
    try {
      setLoading(true);
      let res = await axios.get(`${API}/search/users?q=${keyword}+in:user`);
      setErrorMsg(false);
      console.log('res.data.items', res.data.items);

      setTotal_count(res.data.total_count);

      let data = Promise.all(res.data.items.map(async ({
        avatar_url,
        login,
        html_url,
        url
      }: UsersPropsTypes) => {
        try {
          // let res2 = await axios.get(url);
          return {
            avatar_url,
            login,
            html_url,
            url,
            // details: res2.data
          }
        } catch (error) {
          setErrorMsg(error);
        }
      }))

      dispatch(clearRepositories())
      dispatch(getUsers(await data));
      setLoading(false);
      setErrorMsg(false);
    } catch (error) {
      dispatch(clearUsers())
      setLoading(false);
      console.log(error);
      setErrorMsg(true);
    }
  }

  const searchRepositories = async (keyword: string) => {
    try {
      setLoading(true);
      let res = await axios.get(`${API}/search/repositories?q=${keyword}`);
      setTotal_count(res.data.total_count);
      setErrorMsg(false);
      dispatch(clearUsers())
      dispatch(getRepositories(res.data.items));
      setLoading(false);
    } catch (error) {
      dispatch(clearRepositories())
      setLoading(false);
      console.log(error);
      setErrorMsg(true);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoading(true);
    let keyword = e.target.value;
    setValue(keyword);
    if(keyword.length >= 3){
      type == 'Users' ? debouncedGetUsers(keyword) : debouncedGetRepositories(keyword);
    } else {
      type == 'Users' ? dispatch(clearUsers()) : dispatch(clearRepositories());
    }
    setLoading(false);
  }

  const onSelectType = (e: React.FormEvent<HTMLSelectElement>): void => {
    let selectedValue = e.currentTarget.value;
    setType(selectedValue);

    if(value.length >= 3){
      selectedValue == 'Users' ? debouncedGetUsers(value) : debouncedGetRepositories(value);
    } else {
      type == 'Users' ? dispatch(clearUsers()) : dispatch(clearRepositories());
    }
  }

  return (
    <div className={`container ${value == '' && (!users.length && !repositories.length) ? 'align' : ''}`}>
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
              users.length > 0 ? users.map((info: any, i) => (
                <UserCard {...info} key={i} />
              )) : (
                <>
                  {!errorMsg && value.length > 3 && !loading && !repositories.length && type == 'Users' && total_count == 0 ? <p>There is no items match the search<span className="value">`{value}`</span></p>: null}
                  {errorMsg && type == 'Users' && <p style={{ color: 'red' }}>Something went wrong or API rate limit exceeded</p>}
                </>
              )
            }
    
            {
              repositories.length > 0 ? repositories.map((info: any, i) => (
                <RepositoryCard {...info} key={i} />
              )) : (
                <>
                  {!errorMsg && value.length > 3 && !loading && !users.length && type == 'Repositories' && total_count == 0 ? <p>There is no items match the search<span className="value">`{value}`</span></p>: null}
                  {errorMsg && type == 'Repositories' && <p style={{ color: 'red' }}>Something went wrong or API rate limit exceeded</p>}
                </>
              )
            }
          </>
        )}        
      </div>
    </div>
  );
}

export default App;
