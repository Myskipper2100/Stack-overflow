import "./Premium.css";


import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

function Premium() {
  



  const publishableKey =
  'pk_test_51NCmmnSA5EzUw4rHhg1n9cZG7Qmc0bwPkpSfK6yVzwv4BvD4tuYnwbFHCmu1mkUY6smYTCUdoyzKbN2Vr0Z5GOOh002BXbhWFC';
  const [product, setProduct] = useState({
    name: 'Gold',
    price: 1000,
  });
  const priceForStripe = product.price * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 5000,
    });
    window.location.replace("/AskQuestion")
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  
  return (
    <div>
    <div class="columns">
  <ul class="price">
    <li class="header">Basic</li>
    <li class="grey">₹ 0 / month</li>
    <li>1 QUSTIONS PER DAY</li>
    <li>test_feature</li>
    <li>test_feature</li>
    
    <li class="grey"><a href="/AskQuestion" class="button">Go Free</a></li>
  </ul>
</div>
<div class="columns">
  <ul class="price">
    <li class="header">Silver</li>
    <li class="grey">₹ 100  / month</li>
    <li>5 QUSTIONS PER DAY</li>
    <li>test_feature</li>
    <li>test_feature</li>
    <li class="grey"><StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is ${product.price}`
        }
        token={payNow}
      /></li>
  </ul>
  </div>
  <div class="columns">
  <ul class="price">
    <li class="header">Gold</li>
    <li class="grey">₹ 1000 / month</li>
    <li>UNLIMITED QUESTIONS</li>
    <li>test_feature</li>
    <li>test_feature</li>
    
    <li class="grey"><StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is ${product.price}`
        }
        token={payNow}
      /></li>
  </ul>
  </div>
  </div>
  );
}

export default Premium;