import React from 'react'

export default function TaskCard(props) {

    const { image, title, description, score, kind } = props;
    return (
        <li className='li-box'>
            <div className='detail-box'>
                <img className='detail-img' src={image} alt={title} />
            </div>
            <div className="detail-box detail-task-info">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="score-ctrl">
                    <p>Score: {score}</p>
                    <p>Mode: {kind}</p>
                </div>
            </div>

        </li>
    )
}
