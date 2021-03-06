
export interface Action {
    type: string,
    payload?: any
}

export const getUsers = (payload: any): Action => ({
    type: 'FETCH_USERS',
    payload
});

export const getRepositories = (payload: any): Action => ({
    type: 'FETCH_REPOSITORIES',
    payload
});

export const clearUsers = ():Action => ({
    type: 'CLEAR_USERS'
});

export const clearRepositories = ():Action => ({
    type: 'CLEAR_REPOSITORIES'
});
