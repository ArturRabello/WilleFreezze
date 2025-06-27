import React, {useEffect} from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { loadInitialData } from './features/product/productSlice';
import {type AppDispatch} from "./app/store";
import './index.css';
import { LayoutProvider} from "./context/LayoutContext";

function App(){
  const dispatch = useDispatch<AppDispatch>();


  
  useEffect(() => {
    dispatch(loadInitialData());
  }, [dispatch]);

  return(
    <React.StrictMode>
        <LayoutProvider>
          <AppRoutes/>
        </LayoutProvider>
    </React.StrictMode>
  );
}


export default App