import React, { Component, Fragment } from 'react'

export default class SearchBar extends Component {
    state = {
        searchUser: '',
        showClear: false,

    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    searchSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchUser === '') {
            this.props.setAlertUser('Please enter something', 'danger');
            this.setState({ showClear: false })
        } else {
            this.props.searchUser(this.state.searchUser);
            this.setState({ searchUser: '' })
            this.setState({ showClear: true })

        }
    }

    render() {
        return (
            <Fragment>
                <form className="form" onSubmit={this.searchSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            name='searchUser'
                            placeholder='Search Users...'
                            onChange={this.onChange}
                            value={this.state.searchUser}

                        />
                        <button className="btn btn-after search-btn" >Search</button>
                        {this.state.showClear && <button className="btn btn-after search-btn" onClick={this.props.clearUsers} >Clear</button>}

                    </div>
                </form>
            </Fragment>
        )
    }
}
