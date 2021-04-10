import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios-order";


export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    error: false,
    loading: false,

  },
  reducers: {
    PURCHASE_BURGER_SUCCESS: (state, action) => {
      const newOrder = {
        ...action.payload.orderData,
        id: action.payload.orderId
      }
      state.orders = [...state.orders, newOrder]

    
      },

    PURCHASE_BURGER_FAILED: (state, action) => {

  },

    SET_LOADING: (state, action) => {
      state.loading = action.payload
    }
}
});

// Action creators are generated for each case reducer function
export const { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, SET_LOADING } = orderSlice.actions;


export const purchaseBurgerSuccess = (id, orderData) => async (dispatch) => {
  try {
    dispatch(PURCHASE_BURGER_SUCCESS({
      orderId: id,
      orderData: orderData,
    }))
  } catch (error) {
    
  }
}

export const purchaseBurgerFail = (error) => async(dispatch) => {
  dispatch(PURCHASE_BURGER_FAILED(error))
}

export const purchaseBurgerStart = (orderData) => async(dispatch)=>{
  console.log(orderData)
  try {
    dispatch(SET_LOADING(true))
    const {data} = await axios.post("/orders.json", orderData)
    dispatch(purchaseBurgerSuccess(data, orderData))
    setTimeout(()=>{
      alert('ORDER SUBMITTED')
      dispatch(SET_LOADING(false))
    },2000)
    
  } catch (error) {
    dispatch(PURCHASE_BURGER_FAILED(error))
  }
}

export default orderSlice.reducer;
