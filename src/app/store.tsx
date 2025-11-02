import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../features/basket/basketSlice';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import userPurchasesReducer from '../features/userPurchases/userPurchasesSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    auth: authReducer,
    userPurchases: userPurchasesReducer,
    product: productReducer,
    search: searchReducer,
  }
});

let prevState = store.getState();

// sicronia automatica com local storage
store.subscribe(() => {
  const state = store.getState();
  
  // auth slice
  if(state.auth !== prevState.auth){
    localStorage.setItem('users', JSON.stringify(state.auth.users));
    localStorage.setItem('isLogged', JSON.stringify(state.auth.sessionUser.isLogged));
    localStorage.setItem('currentUser', JSON.stringify(state.auth.sessionUser.currentUser));
  }

  // basket slice
  if(state.basket !== prevState.basket){
     localStorage.setItem('basket', JSON.stringify(state.basket.basket));
  }
 
  // userPurchases slice
  if(state.userPurchases !== prevState.userPurchases){
    localStorage.setItem('purchases', JSON.stringify(state.userPurchases.purchase));
  }
  
  prevState = state;
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

