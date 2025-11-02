import {  Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import CountCart from "../CountCart"
import { LayoutContext } from "../../context/LayoutContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import React from "react";
import { useImage } from "../../context/image/ImageContext";
import {ImageSkeleton} from '../ImageSkeleton';

// Componente lista de produtos do carrinho

function CartItemList() {
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    const baskets = useSelector((state: RootState) => state.basket.basket);
    const idUser = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.id);
    const basketUser = baskets.find((basket) => basket?.userId === idUser);
    const {imagesDone} = useImage();
    const [loading, setLoading] = React.useState(true);

    
    return (
        <div className={`flex align-center h-[265px] gap-x-[10px] ${isMobile && 'flex-col'}`}>
            {/*lista de produtos*/}
            <List className={` flex items-center flex-col  
                ${isDesktop ? ' w-[420px] h-[260px] bg-[#D7F1F9]' : isTablet ? 'w-[420px] h-[260px] ' : 'w-[320px] h-[260px]'} 
                    overflow-y-auto scrollbar-custom`}>
                {basketUser?.products.map((products: any) => (
                    <React.Fragment key={products.id}>
                        <ListItem>
                            {/*imagem do produto*/}
                            <ListItemAvatar>
                                <div>
                                    {loading && <ImageSkeleton width={isDesktop ? 'w-[100px]' : 'w-[50px]'} height={isDesktop ? 'h-[100px]' : 'h-[50px]'} />}
                                    <img src={imagesDone[products.id]} onLoad={() => setLoading(false)} className={`${isDesktop ? 'w-[100px] h-[100px]' : 'w-[50px] h-[50px]'} ${loading ? 'hidden' : ''}`}></img>
                                </div>
                            </ListItemAvatar>
                            {/*informaçoes do produto*/}
                            <ListItemText
                                className={`${isDesktop ? 'pl-[30px]' : 'pl-[10px]'} `}
                                primary={products.name}
                                secondary={products.qntTotal === 'number'
                                    ? products.qntTotal.toFixed(2)
                                    : parseFloat(products.qntTotal).toFixed(2)}
                                slotProps={{
                                    primary: {
                                        sx: { fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px', color: '#1f2937' }
                                    },
                                    secondary: {
                                        sx: { fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', color: '#6b7280' }
                                    }
                                }}
                            />
                            {/*count do produto*/}
                            <div className="pl-[40px]">
                                <CountCart count={products.quantityBasket} id={products.id} />
                            </div>
                        </ListItem>
                        <Divider variant="middle" component="li" sx={{ width: isDesktop ? '360px' : isTablet ? '360px' : '280px', backgroundColor: '#0097C4', height: '3px', listStyle: 'none' }} />
                    </React.Fragment>
                ))}
            </List>
            <Divider variant="middle" component="li" sx={{ backgroundColor: '#0097C4', width: '3px', listStyle: 'none' }} />
        </div>
            
    );
}

export default CartItemList