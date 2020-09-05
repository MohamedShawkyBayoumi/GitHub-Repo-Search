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
    license: any;
    pushed_at: string;
    updated_at: string;
}

const RepositoryCard: React.FC<Props> = ({
    name,
    owner: { login, avatar_url, html_url },
    score,
    svn_url,
    language,
    description,
    license,
    pushed_at,
    updated_at
}) => {
    return (
        <div className="user-card">
            <div className="user-card-content">
                <img src={avatar_url} alt={login} />
                <div className="card-info">
                    <h4>{name}</h4>
                    <div className="repo-info">
                        <h5>Author: <span><a href={html_url}>{login}</a></span></h5>
                        <h5>Desc: <span>{description}</span></h5>
                        {language && <h5>Language: <span>{language}</span></h5>}
                        <h5>Pushed At: <span>{pushed_at}</span></h5>
                        <h5>Updated At: <span>{updated_at}</span></h5>
                        {license && Object.keys(license).length && <h5>License: <span>{license.name}</span></h5>}
                        <h5>Score: <span>{score}</span></h5>
                    </div>
                    <a href={svn_url}>Go to Repository</a>
                </div>
            </div>
        </div>
    )
}

export default RepositoryCard;