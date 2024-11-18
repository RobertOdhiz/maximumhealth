import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../Styles/Form.css';
import userIcon from '../../assets/name-icon.svg';
import locationIcon from '../../assets/location-icon.svg';
import countyIcon from '../../assets/county-icon.svg';
import phoneIcon from '../../assets/phone-icon.svg';
import { createRecord } from '../../Utils/db';
import { useNavigate } from 'react-router-dom';

function CheckoutForm({ item }) {
    const [formData, setFormData] = useState({
        name: '',
        county: '',
        location: '',
        phone: '',
        amount: '',
        quantity: 1,
        note: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.name || !formData.county || !formData.location || !formData.phone) {
            toast.error('Please fill in all required fields.');
            return;
        }
    
        try {
            const postData = {
                ...formData,
                item: item.title,
                price: item.price,
                amount: calculateTotal(),
            };
    
            console.log("Order data: ", postData);
    
            const response = await createRecord('orders', postData);
            console.log("Order response: ", response);
    
            if (response) {
                setFormData({
                    name: '',
                    county: '',
                    location: '',
                    phone: '',
                    amount: '',
                    quantity: 1,
                    note: '',
                });
                
                // Navigate to SuccessPage and pass the item data
                navigate('/success', { state: { item: postData } });
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
            quantity: Math.max(1, prevValues.quantity + increment),
        }));
    };

    const calculateTotal = () => {
        const price = Number(item.price);
        const quantity = formData.quantity;
        let total = 0;
      
        if (item.discount === 1) {
          if (quantity === 1) {
            total = price;
          } else if (quantity === 2) {
            total = price + 0.6 * price;
          } else if (quantity === 3) {
            const priceForTwo = price + 0.6 * price;
            total = priceForTwo + 0.45 * price;
          } else if (quantity >= 4) {
            const priceForThree = price + 0.6 * price + 0.45 * price;
            total = priceForThree + (quantity - 3) * (0.35 * price);
          }
        } else {
          total = price * quantity;
        }
      
        return total.toFixed(2);
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
                {/* <div className="input-group">
                    <img src={emailIcon} alt="Email" className="input-icon" />
                    <input
                        name="email"
                        type='email'
                        placeholder='Email to Receive Invoice'
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div> */}
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
