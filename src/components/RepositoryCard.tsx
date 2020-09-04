import React from 'react'

type Owner = {
    login: string;
    avatar_url: string;
    html_url: string;
}

type Props = {
    name: string;
    owner: Owner;
    score: number;
    svn_url: string;
    language: string;
    description: string;
}

const RepositoryCard: React.FC<Props> = ({
    name,
    owner: { login, avatar_url, html_url },
    score,
    svn_url,
    language,
    description
}) => {
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

export default RepositoryCard;