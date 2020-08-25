import React, { Component, Fragment } from 'react';
import { withAuth } from '../lib/AuthProvider';
import Navbar from '../components/Navbar';
import userService from '../lib/user-service';
import auth from '../lib/auth-service';
import { Link } from 'react-router-dom';
import EditForm from '../components/EditForm';


class UserDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                currentUser: false,
                firstName: '',
                lastName: '',
                gender: '',
                image: '',
                country: '',
                weight: 0,
                height: 0,
                age: 0,
                isDrinker: false,
                isSmoker: false,
                description: '',
                hasSins: [],
                yearsRemaining: 1,
                days: undefined,
                minutes: undefined,
                hours: undefined,
                seconds: undefined

            },
            timerId: null

        }
    }

    findUser = (isCurrentUser) => {
        const id = this.props.match.params.id;
        userService.getOne(id)
            .then((user) => {
                this.setState({ user, currentUser: isCurrentUser })
            })
            .catch(error => console.log(error))


    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const userId = this.props.user._id
        if (userId === id) {
            this.findUser(true)
        } else {
            this.findUser(false)
        }
        console.log(this.state);

        setInterval(() => {

            let now = new Date().getTime();

            let f = new Date("Aug 25, 2065 15:37:25").getTime();
            let future = Math.floor(this.state.user.yearsRemaining * 31536000000);
            let countDownDate = f - now;

            let days = Math.abs(Math.floor(countDownDate / (1000 * 60 * 60 * 24)));
            let hours = Math.abs(Math.floor((countDownDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            let minutes = Math.abs(Math.floor((countDownDate % (1000 * 60 * 60)) / (1000 * 60)));
            let seconds = Math.abs(Math.floor((countDownDate % (1000 * 60)) / 1000));
            this.setState({ days, hours, minutes, seconds })
            console.log({ days, hours, minutes, seconds });
        }, 1000)

    }
    componentWillUnmount() {
        clearTimeout(window.timeout)
    }
    /* componentDidUpdate() {
        setInterval(() => {

            let now = new Date().getTime();

            let f = new Date("Aug 25, 2065 15:37:25").getTime();
            let future = Math.floor(this.state.user.yearsRemaining * 31536000000);
            let countDownDate = f - now;
            console.log({ now, future });
            let days = Math.abs(Math.floor(countDownDate / (1000 * 60 * 60 * 24)));
            let hours = Math.abs(Math.floor((countDownDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            let minutes = Math.abs(Math.floor((countDownDate % (1000 * 60 * 60)) / (1000 * 60)));
            let seconds = Math.abs(Math.floor((countDownDate % (1000 * 60)) / 1000));
            this.setState({ days, hours, minutes, seconds })
            console.log({ days, hours, minutes, seconds });
        }, 1000)
    } */
    handleLogout = e => {
        e.preventDefault();
        clearTimeout(window.timeout)
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

    };

    handleChangeCheckbox = event => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked })
    };

    handleDataSubmit = event => {
        event.preventDefault();
        const { firstName, lastName, gender, age, country, isSmoker, isDrinker, weight, height, image } = this.state.user;
        const updatedUser = { firstName, lastName, gender, age, country, isSmoker, isDrinker, weight, height, image };

        userService.updateOne(updatedUser)
            .then(() => {
                this.findUser(true)
                //this.props.history.push(`/user/${this.props.user._id}`);

            })
            .catch(err => {
                console.log(err)
            })

    }


    render() {
        let { firstName, lastName, gender, isSmoker, isDrinker, age, country, image, tasksCreated, weight, height, health, hasSins, yearsRemaining, description } = this.state.user
        const { days, hours, minutes, seconds } = this.state


        return (
            <Fragment>
                <Navbar />
                <div className="wrapper">
                    <div className="main">
                        <div className='dashboard-bg'>
                            <div className="users-container">
                                <div className="users-box-card">
                                    <div className="detail-box">
                                        <img className='detail-img' src={image} alt={firstName} />

                                    </div>
                                    <div className="detail-box detail-box-info detail-data">
                                        <h2>{firstName} {lastName}</h2>
                                        <p>Gender: {gender}</p>
                                        <p>Tasks Created: {tasksCreated}</p>
                                        <p>Age: {age}</p>
                                        <p>Height: {height}</p>
                                        <p>BMI: {health}</p>
                                        {/*  <p>{yearsRemaining}</p>
                                        <p>{days}:{hours}:{minutes}:{seconds} </p> */}


                                    </div>
                                    <div className="detail-box detail-box-info detail-description">
                                        <p>About: {firstName} </p>
                                        <p>{description}</p>
                                    </div>

                                    <div className="detail-box detail-box-info detail-days">
                                        <h3>Life Expectancy</h3>
                                        <p>{days} : {hours} : {minutes} : {seconds} </p>
                                    </div>
                                    <div className="detail-box detail-box-info detail-sins">
                                        <h3>Probable Causes of Death</h3>
                                        {this.state.user.hasSins.map((sin, index) => {
                                            return <div key={index}>

                                                <h4>{sin.disease}</h4>
                                                <p>{sin.description}</p>

                                            </div>
                                        })}
                                    </div>
                                    <div className="detail-box detail-box-info detail-btn-mode">
                                        <h2>Pick a mode to get tasks</h2>
                                        <button className="btn btn-after">
                                            Bet Mode
                                        </button>
                                        <button className="btn btn-after">
                                            Challenge Mode
                                        </button>
                                    </div>









                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default withAuth(UserDetails);
