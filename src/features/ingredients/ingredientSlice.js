import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios-order";

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredients: null,
    totalPrice: 4,
    error: false
  },
  reducers: {
    ADD_INGREDIENT: (state, action) => {
  
      state.ingredients[action.payload.ingredientName] = state.ingredients[action.payload.ingredientName] + 1
  
      state.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
    
      },

    REMOVE_INGREDIENT: (state, action) => {
      state.ingredients[action.payload.ingredientName] = state.ingredients[action.payload.ingredientName] - 1
  
      state.totalPrice = state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
  },

    SET_INGREDIENT: (state, action) => {
      state.ingredients = action.payload
      state.error = false
    },

    FETCH_INGREDIENT_FAILED: (state, action) => {
        state.error = true
    }

}
});

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

// Action creators are generated for each case reducer function
export const { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENT, FETCH_INGREDIENT_FAILED } = ingredientSlice.actions;


export const initIngredients = () => async (dispatch) => {
  try {
    const {data} = await axios.get("https://react-my-burger-d1511-default-rtdb.firebaseio.com/ingredients.json")
    dispatch(SET_INGREDIENT(data))
  } catch (error) {
    dispatch(FETCH_INGREDIENT_FAILED())
  }
}

export default ingredientSlice.reducer;
