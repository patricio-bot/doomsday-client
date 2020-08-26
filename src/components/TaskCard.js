import React from 'react'

export default function TaskCard(props) {

    const { title, description, score, kind } = props;
    return (
        <li>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>{score}</p>
                <p>{kind}</p>
            </div>

        </li>
    )
}
