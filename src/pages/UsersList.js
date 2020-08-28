import React, { Component, Fragment } from 'react';
import userService from '../lib/user-service';
import UserCard from '../components/UserCard';
import Navbar from '../components/Navbar';
import SearchAlert from '../components/layout/SearchAlert';
import SearchBar from '../components/SearchBar';
import { withAuth } from '../lib/AuthProvider';


class UsersList extends Component {

    state = {
        listOfUsers: [],
        userFiltered: [],
        loading: true,
        alert: null
    }
    componentDidMount() {
        userService.getAll()
            .then((allUsers) => {
                console.log(allUsers);
                this.setState({ listOfUsers: allUsers, userFiltered: allUsers })
                return allUsers;
            })
            .catch((err) => console.log(err));


    }

    /*  getAllUsers = () => {
         axios
             .get(`${baseUrl}/user`)
             .then(allUsers => {
                 this.setState({ listOfUsers: allUsers.data, userFiltered: allUsers.data })
             })
     } */




    filterUser = searchUser => {
        const lowerSearchUser = searchUser.toLowerCase();

        const filteredUser = this.state.listOfUsers.filter(user => {
            let userFirstName = user.firstName.toLowerCase();
            let userLastName = user.lastName.toLowerCase();
            if (userFirstName.includes(lowerSearchUser || userLastName.includes(lowerSearchUser))) {
                return true;
            } else {
                return false;
            }
        })
        this.setState({ userFiltered: filteredUser })
    }
    clearUsers = () => {
        this.componentDidMount();

    }


    setAlertUser = (msg, type) => {
        this.setState({ alert: { msg, type } });
        setTimeout(() => this.setState({ alert: null }), 3000);
    }
    getUserCard = () => {
        const { userFiltered } = this.state;
        return userFiltered.map((oneUser, id) => <UserCard key={oneUser._id} {...oneUser} />)
    }


    render() {

        return (
            <Fragment>
                <Navbar />
                <div className="wrapper">
                    <div className="main">
                        <div className='dashboard-bg'>
                            <div className="users-container">
                                <div className="users-box">
                                    <SearchAlert alert={this.state.alert} />
                                    <SearchBar searchUser={this.filterUser} setAlertUser={this.setAlertUser} clearUsers={this.clearUsers} />
                                </div>
                                <div className="users-box users-box-card">
                                    {this.getUserCard()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default withAuth(UsersList)
