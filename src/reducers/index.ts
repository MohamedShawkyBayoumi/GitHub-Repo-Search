import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import { globalReducer } from './global';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['global']
}

const rootReducer = combineReducers({
    global: globalReducer
})

export default persistReducer(persistConfig, rootReducer)

