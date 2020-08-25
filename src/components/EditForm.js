import React, { Component, Fragment } from 'react';
import userService from '../lib/user-service';
import { Redirect } from 'react-router';

export default class EditForm extends Component {
    state = {
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
        redirectToReferrer: false
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
        console.log(userUpdated)
        userService.updateOne(userUpdated)
            .then(() => {

            })

            .catch(error => console.log(error))
        this.props.history.push({
            pathname: '/dashboard',

            state: { detail: userUpdated }

        })

    }



    render() {
        const { age, country, isSmoker, isDrinker, weight, height, description } = this.state;
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Fragment>
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
                        <textarea
                            className='form-input' name="description"
                            value={description}
                            cols="30" rows="10" placeholder='Description'
                            onChange={this.handleChange}>

                        </textarea>
                    </div>
                    <div className="form-group">

                        <button type='submit' className="btn btn-after btn-big">Send</button>


                    </div>
                </form>
            </Fragment>
        )
    }
}
