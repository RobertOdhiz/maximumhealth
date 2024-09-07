import React, { useState } from 'react';
import '../Styles/Form.css';
import userIcon from '../../assets/name-icon.svg';
import emailIcon from '../../assets/email-icon.svg';
import locationIcon from '../../assets/location-icon.svg';
import countyIcon from '../../assets/county-icon.svg';

function CheckoutForm(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        county: '',
        location: '',
        item: props?.title
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Fill the Form Below to place your order</h3>
            <div className='form-inputs'>
                <div className="input-group">
                    <img src={userIcon} alt="User" className="input-icon" />
                    <input
                        name={props.name || 'name'}
                        type='text'
                        placeholder='Name'
                        onChange={handleInputChange}
                        value={formData.name}
                    />
                </div>
                <div className="input-group">
                    <img src={emailIcon} alt="Email" className="input-icon" />
                    <input
                        name={props.email || 'email'}
                        type='email'
                        placeholder='Email'
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div>
                <div className="input-group">
                    <img src={countyIcon} alt="County" className="input-icon" />
                    <input
                        name={props.county || 'county'}
                        type='text'
                        placeholder='County'
                        onChange={handleInputChange}
                        value={formData.county}
                    />
                </div>
                <div className="input-group">
                    <img src={locationIcon} alt="Location" className="input-icon" />
                    <input
                        name={props.location || 'location'}
                        type='text'
                        placeholder='Enter your exact location'
                        onChange={handleInputChange}
                        value={formData.location}
                    />
                </div>
            </div>
            <button type='submit'>Place Your Order</button>
        </form>
    );
}

export default CheckoutForm;
