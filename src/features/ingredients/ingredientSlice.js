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
      return {...state, 
              ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
              }
      }
    },
    REMOVE_INGREDIENT: (state, action) => {
      state.ingredients[action.ingredientName] -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ADD_INGREDIENT, REMOVE_INGREDIENT } = ingredientSlice.actions;

export default ingredientSlice.reducer;
