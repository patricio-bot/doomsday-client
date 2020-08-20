import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="wrapper">
            <div className="main">
                <div className="home-bg">
                    <div className="home-group">
                        <h1 className="main-title">DOOMSDAY</h1>
                        <h3 className="main-subtitle">Believing in Judgement Day</h3>
                        <Link className='btn-home btn btn-after' to='/signup'>
                            Sign Up
                        </Link>
                        <Link className='btn-home btn btn-after ' to='/login'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;
