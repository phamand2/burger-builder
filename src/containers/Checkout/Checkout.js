import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, useHistory, useLocation, Redirect } from 'react-router-dom'
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
      <>
        {ingredients ?
        <div>
          <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route pathname={location + '/contact-data'} component={ContactData} />
        </div> : 
        <Redirect to='/' />
        } 
        
      </>
    );

}

export default Checkout;
