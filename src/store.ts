import { createStore } from 'redux';
import { globalReducer } from './reducers/global';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, globalReducer)

let store: any = createStore(persistedReducer)
let persistor = persistStore(store)

export {
    store, persistor
}