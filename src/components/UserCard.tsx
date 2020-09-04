import React from 'react'

type Props = {
    avatar_url: string;
    login: string;
    html_url: string;
}

const UserCard: React.FC<Props> = ({ avatar_url, login, html_url }) => {
    return (
        <div className="user-card">
            {/* <img src={avatar_url} alt={login} /> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                    className="img"
                    style={{
                        background: `url('${avatar_url}') no-repeat`
                    }}
                />
            </div>
            <h4><a href={html_url}>{login}</a></h4>
        </div>
    )
}

export default UserCard;