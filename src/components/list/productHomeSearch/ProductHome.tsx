import { Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LayoutContext } from "../../../context/LayoutContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useImage } from "../../../context/image/ImageContext";
import { ImageSkeleton } from "../../ImageSkeleton";
import React from "react";

// Componente lista de produtos para a pagina home

interface Flaver {
    id: string;
    name: string;
    price: number;
    img: string;
    description: string;
    quantidade: number;
}


export function ProductHome({Product}: {Product: Flaver}) {
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    const {imagesDone} = useImage();

    const [loading, setLoading] =  React.useState(true);

    const Navigate = useNavigate();

    // Função para navegar para a página de detalhes do produto
     const handleCardClick = () => {
        Navigate(`/product/${Product.name}/${Product.id}`, {
            state: {
                name: Product.name,
                price: Product.price,
                img: imagesDone[Product.id],
                description: Product.description,
                id: Product.id,
                quantidade: Product.quantidade
            },
        });
     }

    // presets de largura de acordo com o tamanho da tela
    const getUsersWidth = (isDesktop: boolean, isTablet: boolean, isMobile: boolean) => {
        if (isDesktop) return 'w-[500px]';
        if (isTablet) return 'w-[310px]';
        if (isMobile) return 'w-[190px]';
    }

    const getDeviderWidth = (isDesktop: boolean, isTablet: boolean, isMobile: boolean) => {
        if (isDesktop) return '440px';
        if (isTablet) return '270px';
        if (isMobile) return '160px';
    }

    return (
        <div className="flex flex-col justify-center items-center" onClick={handleCardClick}>
            {/* dados do produto */}
            <ListItem className={` mouser-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded-2xl ${getUsersWidth(isDesktop, isTablet, isMobile)} h-[100px]`}>
                {/* icone do produto */}
                <ListItemAvatar>
                    {/* caso a imagem não seja carregada, mostra um skeleton */}
                    <div>
                        {loading && <ImageSkeleton width='w-[50px]' height='h-[50px]'/>}
                        <img src={imagesDone[Product.id]} onLoad={() => setLoading(false)} className={`w-[50px] h-[50px] ${loading ? 'hidden': ''}`}></img>
                    </div> 
                </ListItemAvatar>
                {/* nome do produto */}
                <ListItemText className="p-[10px]">
                    <h1 className={`line-clamp-3 text-overflow-ellipsis w-[80px] font-Inter-regular `} >{Product.name}</h1>
                </ListItemText>
                {/*Descrição do produto*/}
                {isDesktop &&
                    <ListItemText>
                        <p className={`line-clamp-3 text-overflow-ellipsis w-[150px] font-Inter-regular `}>{Product.description}</p>   
                    </ListItemText>}
                {/*preco do produto*/}
                {!isMobile && 
                    <ListItemText>
                        <p className="font-Inter-regular">R$ {Product.price.toFixed(2).replace('.', ',')}</p>
                    </ListItemText>}
            </ListItem>
            <Divider variant="middle" component="li" sx={{ width: getDeviderWidth(isDesktop, isTablet, isMobile), backgroundColor: '#0097C4', height: '3px', listStyle: 'none', my: '2px',  }} />
        </div>
    )
}