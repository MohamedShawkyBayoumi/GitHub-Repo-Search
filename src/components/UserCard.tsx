import React from 'react'

export interface IUsersProps {
    avatar_url: string;
    login: string;
    html_url: string;
    url: string;
    details: any
}

const UserCard: React.FC<IUsersProps> = ({ avatar_url, login, html_url, details }) => {
    console.log('details', details);
    return (
        <div className="user-card">
            <div className="user-card-content">
                <img src={avatar_url} alt={login} />
                <div className="card-info">
                    <h4>{login}</h4>
                    <a href={html_url}>Go to Profile</a>
                </div>
            </div>
        </div>
    )
}

export default UserCard;