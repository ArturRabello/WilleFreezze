import { Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import IconExit from '../../assets/Icon-exit.svg'
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import React, { useContext } from "react";
import { removeProductPurchase } from "../../features/userPurchases/userPurchasesSlice";
import {increaseQuantity} from '../../features/product/productSlice'
import { LayoutContext } from "../../context/LayoutContext";
import { useImage } from "../../context/image/ImageContext";
import { ImageSkeleton } from "../ImageSkeleton";

// componete de lista de compras
function PurchasesItemList() {
    const {isDesktop, isTablet} = useContext(LayoutContext);

    const user_id = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.id)
    const Items = useSelector((state: RootState) => state.userPurchases.purchase);
    
    const filteredPurchases = Items.filter((purchase: any) => purchase.userId === user_id);
    const purchase = filteredPurchases.length > 0 ? filteredPurchases[0] : null;
    const dispatch =  useDispatch<AppDispatch>();
    const {imagesDone} = useImage();

    const [loading, setLoading] = React.useState(true);

    //função de remover produtos
    const handlerDelProducts = (id_produto: string, quantity: number) => {
        dispatch(increaseQuantity({id: id_produto, quantity: quantity}));
        dispatch(removeProductPurchase({userId: user_id!, id: id_produto}));
    }
    
    return (
        <div className={`flex flex-col ${(isDesktop || isTablet) ? 'w-[430px]' : 'w-[290px]'} h-[380px]`}>
            <List className={`flex items-center flex-col ${(isDesktop || isTablet) ? 'w-[420px]' : 'w-[290px]'} h-[380px] overflow-y-auto scrollbar-custom `}>
                {/* lista de produtos da compra */}
                {purchase?.products.map((item: any) => (
                    <React.Fragment key={item.id}>
                        <ListItem >
                            {/* imagem do produto */}
                            <ListItemAvatar >
                                <div>
                                    {loading && <ImageSkeleton width={isDesktop ? 'w-[100px]' : 'w-[50px]'} height={isDesktop ? 'h-[100px]' : 'h-[50px]'}/>}
                                    <img src={imagesDone[item.id]} onLoad={() => setLoading(false)} className={`${(isDesktop || isTablet) ? 'w-[100px] h-[100px]' : 'w-[50px] h-[50px]'} ${loading ? 'hidden' : ''}`}></img>
                                </div>
                            </ListItemAvatar>
                            {/* dados do produto */}
                            <ListItemText
                                className={`${(isDesktop || isTablet) ? 'pl-[30px]' : 'pl-[5px]'}`}
                                primary={item.name}
                                secondary={
                                    typeof item.price === 'number' && !isNaN(item.price)
                                        ? item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                        : 'Preço indisponível'
                                }
                                slotProps={{
                                    primary: {
                                        sx: { fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px', color: '#1f2937' }
                                    },
                                    secondary: {
                                        sx: { fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', color: '#6b7280' }
                                    }
                                }}
                                
                            />
                            {/* quantidades de unidades*/}
                            <p className={`${(isDesktop || isTablet) ? 'pl-[30px]' : 'pr-[10px]'} font-Inter-regular `}>Unidade: {item.quantityBasket}</p>
                            {/* botão de remover */}
                            <button onClick={() => handlerDelProducts(item.id, item.quantityBasket)} className="flex justify-center items-center w-[30px] h-[30px] hover:scale-110">
                                <img src={IconExit} className="w-[20px] h-[20px]"/>
                            </button>
                        </ListItem>
                        <Divider variant="middle" component="li" sx={{ width: (isDesktop || isTablet) ? '360px' : '240px', backgroundColor: '#0097C4', height: '3px', listStyle: 'none' }} />
                    </React.Fragment>
                ))}

            </List>
        </div>
    );
}

export default PurchasesItemList