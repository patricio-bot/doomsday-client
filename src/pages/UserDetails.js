import React, { Component, Fragment } from 'react';
import { withAuth } from '../lib/AuthProvider';
import Navbar from '../components/Navbar';
import userService from '../lib/user-service';
import getTasks from '../helpers/tasks.json';
import auth from '../lib/auth-service';
import { Link } from 'react-router-dom';
import EditForm from '../components/EditForm';
import TaskCard from '../components/TaskCard';
import axiosRequestFunctions from '../lib/auth-service';
import Modal from '../components/layout/Modal';


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
                hasTasks: [],
                yearsRemaining: 1,
                days: undefined,
                minutes: undefined,
                hours: undefined,
                seconds: undefined,
                completedProfile: false

            },
            timerId: null,
            allTasks: getTasks,
            tasksToShow: [],
            showModal: false


        }
    }

    findUser = (isCurrentUser) => {
        let id = this.props.match.params.id;
        if (!id) {
            id = this.props.user._id;
        }
        userService.getOne(id)
            .then((user) => {
                this.setState({ user, currentUser: isCurrentUser, tasksToShow: user.hasTasks })
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

        }, 1000)


    }
    componentWillUnmount() {
        clearTimeout(window.timeout)
    }

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
    getChallengeTask = () => {
        const tasksCopy = [...this.state.allTasks]
        const filteredTask = tasksCopy.filter((taskObj) => {
            if (taskObj.kind.includes('challenge')) {
                return true
            } else {
                return false
            }
        })
        this.setState({ tasksToShow: filteredTask }, () => {
            this.updateTasks()
        })

    }
    getGambleTask = () => {
        const tasksCopy = [...this.state.allTasks]
        const filteredTask = tasksCopy.filter((taskObj) => {
            if (taskObj.kind.includes('gamble')) {
                return true
            } else {
                return false
            }
        })
        this.setState({ tasksToShow: filteredTask }, () => {
            this.updateTasks()
        })
        console.log(filteredTask);
    }
    updateTasks = () => {
        userService.addTasks(this.state.tasksToShow)
            .then(() => { })
            .catch(err => console.log(err))
    }

    handleShowModal() {
        this.setState({ showModal: true })
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
                                    <div className="profile-box">
                                        <div className="detail-box">
                                            <img className='detail-img' src={image} alt={firstName} />

                                        </div>
                                        <div className="detail-box detail-box-info detail-data">
                                            <h2 className='capitalize-text'>{firstName} {lastName}</h2>
                                            <p className='capitalize-text'>Gender: {gender}</p>
                                            {/* <p>Tasks Created: {tasksCreated}</p> */}
                                            <p>Age: {age}</p>
                                            <p>Weight: {weight} kgs</p>
                                            <p>Height: {height} cms</p>
                                            <p>BMI: {health}</p>

                                            <p className='capitalize-text'>About {firstName}: </p>
                                            <p>{description}</p>


                                        </div>
                                    </div>

                                    {this.state.user.completedProfile &&
                                        <Fragment>
                                            <div className="detail-box detail-box-info detail-days">
                                                <h3>Life Expectancy</h3>
                                                <p>{days} <span>d</span> : {hours} <span>h</span>  : {minutes} <span>m</span>  : {seconds} <span>s</span>  </p>
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
                                            {/* <Modal show={this.state.showModal} /> */}

                                            <div className="detail-box detail-box-info detail-btn-mode">

                                                <h2>Pick a mode to get tasks</h2>
                                                {/* <i className="fas fa-info-circle" onClick={this.showModal}></i> */}
                                                <button id='gamble' className="btn btn-after" onClick={this.getGambleTask}>
                                                    Gamble Mode
                                        </button>
                                                <button id='challenge' className="btn btn-after" onClick={this.getChallengeTask}>
                                                    Challenge Mode
                                        </button>
                                            </div>
                                            <div className="detail-box detail-box-info ">
                                                <ul className='task-box-card'>
                                                    {this.state.tasksToShow.map((item, index) => <TaskCard key={index} {...item} />
                                                    )}
                                                </ul>
                                            </div>
                                        </Fragment>

                                    }










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
