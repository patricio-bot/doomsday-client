import React from 'react'
import { Link } from 'react-router-dom';


export default function UserCard(props) {

    const { _id, image, firstName, lastName, gender, tasksCreated, yearsRemaining, health, weight, height } = props;


    return (
        <div className='user-card'>
            <div className="user-card-img card-box">
                <Link to={`/user/${_id}`}> <img src={image} alt={lastName} /></Link>
            </div>
            <div className="card-box card-box-content">
                <Link to={`/user/${_id}`}><h3>{firstName} {lastName}</h3></Link>
                <p>{gender}</p>
                <div>{tasksCreated.map(task => {
                    return <p key={task._id}>{task.title} {task.description}</p>
                })}</div>
                <p>{yearsRemaining}</p>
                <p>{health}</p>
                <p>{weight}</p>
                <p>{height}</p>

            </div>
        </div>
    )
}
