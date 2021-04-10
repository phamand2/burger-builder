import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { purchaseBurgerStart, SET_LOADING } from "../../../features/orders/orderSlice";
import { Redirect, useHistory } from "react-router";

const ContactData = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()



  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Address",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Zipcode",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "cheapest",
      valid: true,
      validation: {}
    },
  })

  const [formIsValid, setFormIsValid] = useState(false)
  // const [loading, setLoading] = useState(false)
  const loading = useSelector(state => state.order.loading)
  const ingredients = useSelector(state => state.ingredient.ingredients)
  const price = useSelector(state => state.ingredient.totalPrice)
  console.log(price)

  const orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: ingredients,
      price: price,
      orderData: formData,
    };

    dispatch(purchaseBurgerStart(order))
    
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  const inputChangedHandler = (e, identifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true
    updatedOrderForm[identifier] = updatedFormElement;

    let formIsValid = true;
    for (let identifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[identifier].valid && formIsValid
    }

    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  };


    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      });
    }

    let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            touched = {formElement.config.touched}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(e) => inputChangedHandler(e, formElement.id)}
          />
        ))}
        <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
      </form>
    );

    if (loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  
}

export default ContactData;
