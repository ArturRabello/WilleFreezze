import { useContext} from "react";
import { LayoutContext } from "../../../context/LayoutContext";
import CartItemList from "../../list/CartItemList";
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { addProductPurchase } from "../../../features/userPurchases/userPurchasesSlice";
import { resetBasket } from "../../../features/basket/basketSlice";
import {reduceQuantity} from '../../../features/product/productSlice'

// Componente do carrinho

function BoxBasket() {
    const { isDesktop, isTablet } = useContext(LayoutContext);
    
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    
    const idUser = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.id);
    const productsBasket = useSelector((state: RootState) => state.basket.basket.find((basket: { userId: any; }) => basket.userId === idUser)?.products);
    const priceTotal = useSelector((state: RootState) => state.basket.basket.find((basket: { userId: any; }) => basket.userId === idUser)?.total);

    //função para comprar os produtos
    const handelerAddPurchasesClick = () => {
        if (productsBasket && idUser) {
            productsBasket.forEach((product: any) => {
                dispatch(addProductPurchase({ userId: idUser, product: product }));
                dispatch(reduceQuantity({id: product.id , quantity: product.quantityBasket}));
            });
            dispatch(resetBasket({ userId: idUser }));
            navigate("/MyPurchases");
        }
    }
    return (
        
        <div className="flex flex-col items-center p-[60px] pt-[40px]">
            <div className={`flex flex-col ${isDesktop ? 'w-[956px] h-[524px] bg-[#D7F1F9] shadow-lg' : isTablet ? 'w-[720px] h-[524px]' : ' '} rounded-[12px] `}>
                {/* Titulo da tela */}
                <p className={`text-[40px] font-Poppins-bold  ${isDesktop ? 'pl-[120px] pt-[60px]' : isTablet ? 'pl-[40px] pt-[60px]' : 'pt-[60px] text-center'}`}>Carrinho</p>
                <div className={`font-Inter-regular align-center ${isDesktop ? 'pl-[100px] pt-[40px] flex ' : isTablet ? ' pt-[40px] flex' : 'pt-[40px]]'}`}>
                    {/* lista de produtos */}
                    <CartItemList/>
                    <div className={`flex flex-col gap-y-[20px] items-center justify-end  ${isDesktop ? 'pb-[40px] pl-[40px]' : isTablet ? 'pb-[40px] pl-[10px]' : 'pb-[40px]'}`}>
                        {/* Valor total */}
                         <p className="text-[20px] font-bold">
                            {`Total: ${priceTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? 'R$ 0,00'}`}
                         </p>
                        <button onClick={handelerAddPurchasesClick} className="w-[200px] h-[50px] bg-[#0097C4] rounded-[12px] shadow-lg text-white text-bold transition-300 hover:scale-105">Finalizar compra</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoxBasket;
