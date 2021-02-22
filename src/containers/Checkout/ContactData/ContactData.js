import { render } from "@testing-library/react";
import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: false });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Andrew",
        address: {
          street: "React Street",
          zipCode: "30041",
          country: "USA",
        },
        email: "Test1@yahoo.com",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((res) => {
      this.setState({ loading: false })
      this.props.history.push('/')
    })
      .catch((error) => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form action="">
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={styles.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
