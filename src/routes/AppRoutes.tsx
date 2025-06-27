import {BrowserRouter, Routes, Route} from "react-router";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Product from "../pages/Product.tsx";
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import {type RootState } from '../app/store';
import ScrollToTop from "./ScrollToTop.tsx";
import Basket from "../components/headerIcons/Basket.tsx";
import {LayoutContext} from "../context/LayoutContext.tsx";
import { useContext } from "react";

function AppRoutes() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.sessionUser.isLogged);
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Home isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />}></Route>
                <Route path="/login" element={isLoggedIn ? <Home isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} /> : <Login isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />}></Route>
                <Route path="/product/:name/:id" element={<Product isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />}></Route>
                <Route path="/basket/:userId" element={<Basket />}></Route> 
                {/*<Routes path="/login" element={<Login/>}></Routes>
      <Routes path="/register" element={<Register/>}></Routes>
      <Routes path="/dashboard-account" element={<Dashboard-account/>}></Routes>
      <Routes path="/dashboard-product" element={<dashboard-product/>}></Routes>*/}
            </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes