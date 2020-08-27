import React, { Component, Fragment } from 'react';
import userService from '../lib/user-service';
import { withAuth } from '../lib/AuthProvider';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';


class EditUser extends Component {


    state = {
        firstName: '',
        lastName: '',
        gender: '',
        image: '',
        country: '',
        weight: 10,
        height: 10,
        age: 10,
        isDrinker: false,
        isSmoker: false,
        description: ''
    }
    componentDidMount() {

        userService.getOne(this.props.user._id)
            .then((user) => {
                console.log(user);
                const { firstName, lastName, gender, age, country, isSmoker, isDrinker, weight, height, image, description } = user;

                this.setState({ firstName, lastName, gender, country, isSmoker, isDrinker, image, description, age, weight, height })
            })
            .catch(error => console.log(error))
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });

    };

    handleChangeCheckbox = event => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked })
    }

    handleFormSubmit = event => {
        event.preventDefault()

        const { firstName, lastName, gender, age, country, isSmoker, isDrinker, weight, height, image, description } = this.state;

        const userUpdated = { firstName, lastName, gender, age, country, isSmoker, isDrinker, weight, height, image, description };

        userService.updateOne(userUpdated)
            .then(() => {
                this.props.history.push(`/user/${this.props.user._id}`)
            })
            .catch(error => console.log(error))
    }

    render() {
        const { firstName, lastName, gender, age, country, isSmoker, isDrinker, weight, height, image, description } = this.state;
        return (
            <Fragment>
                <Navbar />
                <div className="wrapper">
                    <div className="main">
                        <div className="dashboard-bg">
                            <div className='users-container'>

                                <div className="users-box-card">
                                    <div className="edit-user">
                                        <div className='profile-box'>
                                            <div className="detail-box">
                                                <img className='detail-img' src={image} alt={firstName} />

                                            </div>
                                            <div className="detail-box detail-box-info">
                                                <h2 className='capitalize-text'>{firstName} {lastName}</h2>
                                                <p className='capitalize-text'>Gender: {gender}</p>
                                                <p>Age: {age}</p>
                                                <p>Weight: {weight} kg</p>
                                                <p>Height: {height} cms</p>
                                                <p className='capitalize-text'>About {firstName}:</p>
                                                <p> {description}</p>

                                            </div>
                                        </div>


                                        <form className="form form-grid" onSubmit={this.handleFormSubmit}>

                                            <div className="form-group">
                                                <input
                                                    type="number" className="form-input" name='age'
                                                    value={age}
                                                    placeholder='Age'
                                                    onChange={this.handleChange} />
                                                <label className="form-label">Age</label>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="number" className="form-input" name='weight'
                                                    value={weight} placeholder='Weight: Must be in Kg'
                                                    onChange={this.handleChange} />
                                                <label className="form-label">Weight</label>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="number" className="form-input" name='height'
                                                    value={height} placeholder='Height: Must be in cms'
                                                    onChange={this.handleChange} />
                                                <label className="form-label">Height</label>

                                            </div>
                                            <div className="checkbox-control">
                                                <div className="form-group checkbox-input">

                                                    <label className="detail-label label-container">Do you Smoke?
                                                <input
                                                            type="checkbox"
                                                            name="isSmoker"
                                                            checked={isSmoker}
                                                            onChange={this.handleChangeCheckbox} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>

                                                <div className="form-group checkbox-input">

                                                    <label className="detail-label label-container">Are you a Drunk?
                                                <input
                                                            type="checkbox" name="isDrinker"
                                                            checked={isDrinker}
                                                            onChange={this.handleChangeCheckbox} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <select
                                                    name="country"
                                                    value={country} className="detail-select"
                                                    onChange={this.handleChange} >
                                                    <option value="Angola">Angola</option>
                                                    <option value="Argentina">Argentina</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="Belgium">Belgium</option>
                                                    <option value="Bolivia">Bolivia</option>
                                                    <option value="Burkina Faso">Burkina Faso</option>
                                                    <option value="Cambodia">Cambodia</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="China">China</option>
                                                    <option value="Denmark">Denmark</option>
                                                    <option value="Djibouti">Djibouti</option>
                                                    <option value="Ecuador">Ecuador</option>
                                                    <option value="Finland">Finland</option>
                                                    <option value="France">France</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="Hungary">Hungary</option>
                                                    <option value="Iceland">Iceland</option>
                                                    <option value="Ireland">Ireland</option>
                                                    <option value="Japan">Japan</option>
                                                    <option value="Kenya">Kenya</option>
                                                    <option value="Mexico">Mexico</option>
                                                    <option value="Mongolia">Mongolia</option>
                                                    <option value="Netherlands">Netherlands</option>
                                                    <option value="Nigeria">Nigeria</option>
                                                    <option value="Poland">Poland</option>
                                                    <option value="Rwanda">Rwanda</option>
                                                    <option value="Russian Federation">Russian Federation</option>
                                                    <option value="Serbia">Serbia</option>
                                                    <option value="Spain">Spain</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="United States of America">United States of America</option>
                                                    <option value="Venezuela">Venezuela</option>
                                                    <option value="Vietnam">Vietnam</option>
                                                    <option value="Zambia">Zambia</option>

                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <input className="form-input" type="text" name="description"
                                                    value={description} onChange={this.handleChange} placeholder='Description' maxLength='100' />

                                            </div>
                                            <div className="form-group">

                                                <button type='submit' className="btn btn-after btn-big">Send</button>


                                            </div>
                                        </form>
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


export default withAuth(EditUser);