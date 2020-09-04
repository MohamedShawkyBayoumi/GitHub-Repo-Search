import React from 'react'

const Header: React.FC = () => {
    return (
        <header>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <img src={require('../assets/github-logo.png')} alt="Github Logo" className="logo" />
                <div>
                    <h1>Github Searcher</h1>
                    <p>Search users or repositories below</p>
                </div>
            </div>
            <div>
                <input type="text" placeholder="Start typing to search.." />
                <select>
                    <option value="Users">Users</option>
                    <option value="Repositories">Repositories</option>
                </select>
            </div>
        </header>
    )
}

export default Header;