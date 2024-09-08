import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../Styles/Form.css';
import userIcon from '../../assets/name-icon.svg';
import emailIcon from '../../assets/email-icon.svg';
import locationIcon from '../../assets/location-icon.svg';
import countyIcon from '../../assets/county-icon.svg';
import phoneIcon from '../../assets/phone-icon.svg';
import { createRecord } from '../../Utils/db';

function CheckoutForm({ item }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        county: '',
        location: '',
        phone: '',
        amount: '',
        quantity: 1,
        note: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Ensure form validation
        if (!formData.name || !formData.email || !formData.county || !formData.location || !formData.phone) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            // Construct the data object for the API
            const postData = {
                ...formData,
                item: item.name,
                price: item.price,
                amount: calculateTotal(),
            };

            console.log("Order data: ", postData);

            // Send POST request to place the order
            const response = await createRecord('orders', postData); // Replace 'Sheet2' with your actual sheet name
            console.log("Order response: ", response);

            if (response.message === 'Data successfully written') {
                toast.success('Order placed successfully!');
                // Optionally, clear form data or redirect user
                setFormData({
                    name: '',
                    email: '',
                    county: '',
                    location: '',
                    phone: '',
                    amount: '',
                    quantity: 1,
                    note: '',
                });
            } else {
                toast.error('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('An error occurred while placing your order. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleQuantityChange = (increment) => {
        setFormData((prevValues) => ({
            ...prevValues,
            quantity: Math.max(1, prevValues.quantity + increment), // Ensure quantity is at least 1
        }));
    };

    const calculateTotal = () => {
        return (formData.quantity * Number(item.price)).toFixed(2); // Ensure price is a number and format to 2 decimal places
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Fill the Form Below to place your order</h3>
            <div className='form-inputs'>
                <div className="input-group">
                    <img src={userIcon} alt="User" className="input-icon" />
                    <input
                        name="name"
                        type='text'
                        placeholder='Your Name'
                        onChange={handleInputChange}
                        value={formData.name}
                    />
                </div>
                <div className="input-group">
                    <img src={phoneIcon} alt="Phone" className="input-icon" />
                    <input
                        name="phone"
                        type='text'
                        placeholder='Your Phone Number, e.g. 07xxxxxxxx'
                        onChange={handleInputChange}
                        value={formData.phone}
                    />
                </div>
                <div className="input-group">
                    <img src={emailIcon} alt="Email" className="input-icon" />
                    <input
                        name="email"
                        type='email'
                        placeholder='Email to Receive Invoice'
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div>
                <div className="input-group">
                    <img src={countyIcon} alt="County" className="input-icon" />
                    <input
                        name="county"
                        type='text'
                        placeholder='County of Residence'
                        onChange={handleInputChange}
                        value={formData.county}
                    />
                </div>
                <div className="input-group">
                    <img src={locationIcon} alt="Location" className="input-icon" />
                    <input
                        name="location"
                        type='text'
                        placeholder='Enter Building/Street/Landmark'
                        onChange={handleInputChange}
                        value={formData.location}
                    />
                </div>
            </div>
            <div className='order-summary'>
                <h2>Order Summary</h2>
                <div className='order-item'>
                    <p>SubTotal</p>
                    <p>{item.price}</p>
                </div>
                <div className='order-item'>
                    <label htmlFor='quantity'>Quantity</label>
                    <div className='quantity-buttons'>
                        <button
                            type='button'
                            className='quantity-button'
                            onClick={() => handleQuantityChange(-1)}
                        >
                            -
                        </button>
                        <input
                            id='quantity'
                            name='quantity'
                            type='number'
                            min='1'
                            value={formData.quantity}
                            onChange={(e) => handleQuantityChange(Number(e.target.value) - formData.quantity)}
                        />
                        <button
                            type='button'
                            className='quantity-button'
                            onClick={() => handleQuantityChange(1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='order-item total'>
                    <p>Total</p>
                    <p><strong>{calculateTotal()}</strong></p>
                </div>
            </div>
            <div className='note-field'>
                <label htmlFor='note'>Note</label>
                <textarea
                    id='note'
                    name='note'
                    placeholder='Any special instructions or notes...'
                    onChange={handleInputChange}
                    value={formData.note}
                ></textarea>
            </div>
            <button type='submit'>Place Your Order</button>
        </form>
    );
}

export default CheckoutForm;
