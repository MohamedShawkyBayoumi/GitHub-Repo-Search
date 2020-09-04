import { Action } from '../actions/global';

type UsersTypes = {

}

type RepositoriesTypes = {

}

export interface GlobalState {
    users: Array<UsersTypes>,
    repositories: Array<RepositoriesTypes>
}

const initialState = {
    users: [],
    repositories: []
}

export const globalReducer = (state:GlobalState = initialState, action: Action) => {
    switch(action.type){
        case 'FETCH_USERS':
            return {
                ...state,
                users: [...action.payload]
            }
        case 'FETCH_REPOSITORIES':
            return {
                ...state,
                repositories: [...action.payload]
            }
        case 'CLEAR_USERS':
            return {
                ...state,
                users: []
            }
        case 'CLEAR_REPOSITORIES':
            return {
                ...state,
                repositories: []
            }
        default:
            return state;
    }
}