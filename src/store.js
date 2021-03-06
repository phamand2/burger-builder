import { configureStore } from '@reduxjs/toolkit'
import ingredientReducer from '../src/features/ingredients/ingredientSlice'

export default configureStore({
  reducer: {
    ingredient: ingredientReducer
  }
})