import React, { Component } from 'react';
import auth from './auth-service';


const { Consumer, Provider } = React.createContext();


//HOC para crear Consumer
const withAuth = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <Consumer>
                    {
                        ({ login, signup, user, logout, isLoggedin }) => {
                            return (
                                <WrappedComponent
                                    login={login}
                                    signup={signup}
                                    user={user}
                                    logout={logout}
                                    isLoggedin={isLoggedin}
                                    {...this.props} />
                            );
                        }
                    }
                </Consumer>
            )
        }
    }
};

//Provider
export default class AuthProvider extends Component {
    state = {
        isLoggedin: false,
        user: null,
        isLoading: true
    };

    componentDidMount() {
        auth.me()
            .then((user) => this.setState({ isLoggedin: true, user: user, isLoading: false }))
            .catch((err) => this.setState({ isLoggedin: false, user: null, isLoading: false }));
    }

    signup = (user) => {
        const { firstName, lastName, gender, email, password } = user;

        auth.signup({ firstName, lastName, gender, email, password })
            .then((user) => this.setState({ isLoggedin: true, user }))
            .catch(({ response }) => this.setState({ message: response.data.statusMessage }));
    };


    login = (user) => {
        const { email, password } = user;

        auth.login({ email, password })
            .then((user) => this.setState({ isLoggedin: true, user }))
            .catch((err) => console.log(err));
    };

    logout = () => {
        auth.logout()
            .then(() => this.setState({ isLoggedin: false, user: null }))
            .catch((err) => console.log(err));
    };


    render() {

        const { isLoading, isLoggedin, user } = this.state;
        const { login, logout, signup } = this;

        return (
            isLoading ?
                <div>Loading</div>
                :
                (
                    <Provider value={{ isLoggedin, user, login, logout, signup }}>
                        {this.props.children}
                    </Provider>
                )/*<Provider> "value={}" datos que estarán disponibles para todos los componentes <Consumer> */
        )
    }
}
export { Consumer, withAuth };