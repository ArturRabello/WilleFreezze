import React, { useContext } from "react";
import {useLocation} from 'react-router';
import { LayoutContext } from "../context/LayoutContext";

function BoxProduto() {
    const location = useLocation();
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    const { name, price, img, description, id} = location.state;
    const pathParts = location.pathname.split('/');
    
    return (
        <>
        <div className={`flex justify-center pb-[10px] ${isDesktop ? 'pt-[40px] pr-[580px] ' : isTablet ? 'pt-[170px]  ' : '  pt-[170px] '} `}>
            <p className="text-[20px] text-[#0097C4] font-bold">
            <span>Home</span>
            {pathParts.map((part, index) => 
                <span key={index}>
                    {part}
                    {index !== pathParts.length - 1 && ' > '}
                </span>)}
            </p>
        </div>
            <div className={`flex justify-center  ${isDesktop ? 'h-[600px] pb-[40px]' : ' pb-[40px] '}`}>
                <div className={` flex items-center justify-evenly gap-x-[40px] rounded-[12px] ${isDesktop ? ' shadow-lg  w-[956px] h-[470px] bg-[#D7F1F9] ' : isTablet ? 'w-[668px] h-[470px]' : ' flex-col w-[320px] h-[770px]'} `}>
                    <img src={`/imgFlavers/${img}`} alt="" className={` ${isDesktop ? 'w-[416px] h-[416px]' : isTablet ? 'w-[350px] h-[350px]' : 'w-[280px] h-[280px]'} rounded-[12px] shadow-lg `}></img>
                    <div className="flex flex-col items-center gap-y-5  w-[320px] ">
                        <h1 className="text-[40px] font-bold ">{name}</h1>
                        <p className="text-center max-w-[280px] h-[70px] line-clamp-3 mx-auto">
                            {description}
                        </p>
                        <p className=" text-[36px] text-center font-semibold">{price.toLocaleString('pt-BR', ({ style: 'currency', currency: 'BRL' }))}</p>
                        <button className="w-[200px] h-[50px] bg-[#0097C4] rounded-[12px] shadow-lg text-white text-bold transition-300 hover:scale-105">
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoxProduto;