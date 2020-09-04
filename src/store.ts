import { createStore } from 'redux';
import { globalReducer } from './reducers/global';

export const store = createStore(globalReducer)