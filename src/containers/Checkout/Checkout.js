import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, useHistory, useLocation } from 'react-router-dom'
import ContactData from "./ContactData/ContactData";
import { useSelector } from "react-redux";

const Checkout = () => {

  const ingredients = useSelector(state => state.ingredient.ingredients)


  const history = useHistory()
  const location = useLocation()

  
  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace("/checkout/contact-data");
  };


    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route pathname={location + '/contact-data'} component={ContactData} />
      </div>
    );

}

export default Checkout;
