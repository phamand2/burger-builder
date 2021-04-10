import React, { useState, useEffect } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../../features/ingredients/ingredientSlice";
import { useHistory } from "react-router-dom";
import { initIngredients } from "../../features/ingredients/ingredientSlice";
import axios from "../../axios-order";



const BurgerBuilder = () => {


  const [purchasing, setPurchasing] = useState(false);


  const history = useHistory()


  const ingredients = useSelector(state => state.ingredient.ingredients)
  const totalPrice = useSelector(state => state.ingredient.totalPrice)
  const error = useSelector(state => state.ingredient.error)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initIngredients())
  }, [dispatch])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }



  const addIngredient = (ingName) => {
    dispatch(ADD_INGREDIENT({
      ingredientName: ingName
    }))
  }

  const removeIngredient = (ingName) => {
    dispatch(REMOVE_INGREDIENT({
      ingredientName: ingName
    }))
  }



  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    history.push('/checkout')
  };

    const disabledInfo = {
      ...ingredients,
    };


    // {salad: true, meat: false, ...}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }


    let orderSummary = null
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;



    if (ingredients) {
      burger = (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            ordered={purchaseHandler}
            ingredientAdded={addIngredient}
            ingredientRemove={removeIngredient}
            disabled={disabledInfo}
            price={totalPrice}
            purchaseable={updatePurchaseState(ingredients)}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          price={totalPrice}
          ingredients={ingredients}
          purchaseCanceled={purchaseCancelHandler}
          purchaseContinue={purchaseContinueHandler}
        />
      );
    }




    return (
      <>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  
}

export default withErrorHandler(BurgerBuilder, axios);
