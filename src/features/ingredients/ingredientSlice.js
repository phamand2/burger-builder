import { createSlice } from "@reduxjs/toolkit";

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
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

}
});

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

// Action creators are generated for each case reducer function
export const { ADD_INGREDIENT, REMOVE_INGREDIENT } = ingredientSlice.actions;

export default ingredientSlice.reducer;
