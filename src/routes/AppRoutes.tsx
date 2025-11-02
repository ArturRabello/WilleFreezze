import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Product from "../pages/Product.tsx";

import { useDispatch, useSelector } from 'react-redux';
import {type AppDispatch, type RootState } from '../app/store';
import ScrollToTop from "./ScrollToTop.tsx";
import BasketPage from "../pages/BasketPage.tsx";
import MyPurchases from "../pages/MyPurchases.tsx";
import { useEffect, type JSX } from "react";
import AdminPage from "../pages/AdminPage.tsx";
import ProductController from "../pages/ProductsController.tsx";
import UsersControllers from "../pages/UsersControllers.tsx";
import { useImage } from "../context/image/ImageContext.tsx";
import { loadInitialData } from "../features/product/productSlice.tsx";

//Rotas do site
function AppRoutes() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.sessionUser.isLogged);
    const typeUser = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.role);
    
    const dispatch = useDispatch<AppDispatch>();
    const sessionUser = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.id);
    const {initialState} = useImage();

    //interface para a definição das rotas
    interface AppRoute {
        path: string;
        element: JSX.Element;
        authRequired?: boolean;
        adminOnly?: boolean;
    }

    // definição das rotas
    const routes: AppRoute[] = [
        // rotas sem autenticação
        {path: "/", element: typeUser === 'admin' ? <AdminPage/> : <Home/>},
        {path: "login", element: <Login/>},

        //Rotas de usuário logado
        {path: "/product/:name/:id", element: <Product/>, authRequired: true,},
        {path: "/basket", element: <BasketPage/>, authRequired: true},
        {path: "/Mypurchases", element: <MyPurchases />, authRequired: true},

        //Rotas de admin
        {path: "/ProductController", element: <ProductController/>, adminOnly: true},
        {path: "/UsersController", element: <UsersControllers/>, adminOnly: true},
    ]
    
    //carrega os dados iniciais ao localStorage
    //carrega as imagens ao indexedDB
    //ambos os dados são puxado de um arquivo json
    //os dados são puxados toda vez que um dispatch acontece ou quando uma sessão é iniciada
    useEffect(() => {
        const localData = async () => {
            dispatch(loadInitialData());
            await initialState();
        }
        localData();
    }, [dispatch ,sessionUser]);
    
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <Routes>
                {routes.map((route) => {
                    // redireciona para o login caso não esteja logado
                    if(route.authRequired && !isLoggedIn ) {
                        return <Route key={route.path} path={route.path} element={<Navigate to="/login" />}/>;
                    }
                    // caso voce acesse páginas que requer admin e vc está logado como user, ele redireciona para o home
                    if(route.adminOnly && typeUser === 'user') {
                        return <Route key={route.path} path={route.path} element={<Navigate to="/" />}/>;
                    }
                    // caso voce acesse páginas pertencentes aos usuarios e vc está logado como admin, ele redireciona para o home
                    if(route.authRequired && typeUser === 'admin') {
                        return <Route key={route.path} path={route.path} element={<Navigate to="/" />}/>
                    }
                    //Rotas
                    return <Route key={route.path} path={route.path} element={route.element}/>;
                    //Qualquer rota desconhecida redireciona para o home
                
                })}
            </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes