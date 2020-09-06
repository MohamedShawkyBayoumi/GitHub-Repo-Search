import React from 'react';

export type Props = {
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectType: (e: React.FormEvent<HTMLSelectElement>) => void;
}

const Header: React.FC<Props> = ({ value, type, onChange, onSelectType }) => {
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
                <input
                    type="text"
                    placeholder="Start typing to search.."
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                <select
                    onChange={(e) => onSelectType(e)}
                    value={type}
                >
                    <option value="Users">Users</option>
                    <option value="Repositories">Repositories</option>
                </select>
            </div>
        </header>
    )
}

export default Header;