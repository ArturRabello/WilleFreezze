import { Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { deleteProduct, addSpecificNumberQuantity, addSpecificPriceValue } from "../../../../features/product/productSlice";[]
import { LayoutContext } from "../../../../context/LayoutContext";
import exit from '../../../../assets/Icon-exit.svg'
import React, {  useContext, useState }  from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/store";
import { useImage } from "../../../../context/image/ImageContext";
import { ImageSkeleton } from "../../../ImageSkeleton";

// Componente lista de produtos filtrados
// produtos que podem ser alterados 

interface Flaver {
    id: string;
    name: string;
    price: number;
    img: string;
    description: string;
    quantidade: number;
}

export function FilteredProductsList({ produtos, modalProductViewOpen, selectProduct, img, isSearch = false,  }:
        {produtos: Flaver; modalProductViewOpen: () => void; 
            selectProduct: (id: string | null) => void; isSearch?: boolean; img: string}) {
    
    const dispatch = useDispatch<AppDispatch>();
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    const [quantidade, setQuantidade] = useState(produtos.quantidade);
    const [price, setPrice] = useState(produtos.price);
    const [loading, setLoading] =  React.useState(true);
    const {deleteImage} = useImage();

    // abre o modal de visualização das informações do produto
    const handlerOpenModalView = () => {
        console.log("abrir modal view");
        modalProductViewOpen();
        selectProduct(produtos.id);
    }

    // remove o produto tanto do estado quanto do storage
    const handlerRemoveProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        const remove = async () =>{
            dispatch(deleteProduct({ id: produtos.id }))
            await deleteImage(produtos.id);
        }
        remove();
    }

    // presets de largura e altura de acordo com o tamanho da tela
    function getItemSize(isDesktop: boolean, isTablet: boolean, isMobile: boolean, isSearch: boolean) {
        if (isDesktop && isSearch) return 'w-[500px] h-[120px]';
        if (isTablet && isSearch) return 'w-[310px] h-[110px]';
        if (isMobile && isSearch) return 'w-[120px] h-[64px]';
        if (isDesktop || isTablet) return 'w-[520px] h-[120px]'
        if (isMobile) return 'w-[280px] h-[54px]';
    }

    function getDevider(isDesktop: boolean, isTablet: boolean, isMobile: boolean, isSearch: boolean) {
        if (isDesktop && isSearch) return '500px';
        if (isTablet && isSearch) return '310px';
        if (isMobile && isSearch) return '180px';
        if (isDesktop || isTablet) return '520px'
        if (isMobile) return '240px';
    }

    return(
        
        <React.Fragment key={produtos.id}>
            {/* dados do produto */}
            <ListItem onClick={handlerOpenModalView} className={` flex items-center font-roboto hover:bg-gray-200 ${getItemSize(isDesktop, isTablet, isMobile, isSearch)}`}>
                <ListItemAvatar>
                    {/* caso a imagem nao seja carregada, mostra um skeleton */}
                    <div>
                        {loading && <ImageSkeleton width={isDesktop ? 'w-[100px]' : isTablet ? 'w-[80px]' : 'w-[50px]'} height={isDesktop ? 'h-[100px]' : isTablet ? 'h-[80px]' : 'h-[50px]'}/>}
                        <img src={img} onLoad={() => setLoading(false)} className={`${(isDesktop || isTablet) ? 'w-[100px] h-[100px]' : 'w-[50px] h-[50px]'} ${loading ? 'hidden' : ''}`}></img>
                    </div>
                </ListItemAvatar>
                <ListItemText className="p-[10px]">
                    {/* nome do produto */}
                    <h1 className={`line-clamp-3 text-overflow-ellipsis ${isMobile ? 'w-[50px]' : isTablet && !isSearch ? 'w-[60px]' : 'w-[80px]'} font-Inter-regular`} >{produtos.name}</h1>
                </ListItemText>
                {/* descricao do produto */}
                {(!isMobile && !isSearch ) && 
                    <ListItemText className="max-w-[150px] line-clamp-3 break-words whitespace-normal font-Inter-regular">
                        <p className="font-Inter-regular">{produtos.description}</p>
                    </ListItemText>}
                {
                    (isDesktop || !isSearch) && (
                        <>
                        {/*input de quantidade */}
                            <input
                                type="number"
                                min={1}
                                className={` ${isDesktop || isTablet ? 'w-[60px]' : 'w-[26px]'} line-clamp text-overflow-ellipsis text-center border rounded border-[#0097C4] font-Inter-regular`}
                                value={quantidade}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 0) {
                                        setQuantidade(value);
                                        dispatch(addSpecificNumberQuantity({ id: produtos.id, quantity: value }));
                                    }
                                }}>                               
                            </input>
                            {/*input de preco */}
                            <div className="flex flex-row items-center gap-x-[5px] mx-[10px] font-Inter-regular">
                                <p>R$</p>
                                <input
                                    type="number"
                                    step={"0.01"}
                                    min={0}
                                    value={price}
                                    className={` ${isDesktop || isTablet ? 'w-[60px]' : 'w-[46px]'} line-clamp text-overflow-ellipsis text-center border rounded border-[#0097C4]`}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        const price = Number(e.target.value);
                                        if (price >= 0) {
                                            setPrice(price);
                                            dispatch(addSpecificPriceValue({ id: produtos.id, price: price }));
                                        }
                                    }}>
                                </input>
                            </div>
                        </>
                    )
                }
                {/* botao para remover o produto */}
                <img onClick={handlerRemoveProduct} className="w-[20px] h-[20px] hover:scale-105" src={exit} alt="Remover"></img>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ width: getDevider(isDesktop, isTablet, isMobile, isSearch), backgroundColor: '#0097C4', height: '3px', listStyle: 'none', marginBottom: isSearch ? '10px' : undefined}} />
        </React.Fragment>
    )
}