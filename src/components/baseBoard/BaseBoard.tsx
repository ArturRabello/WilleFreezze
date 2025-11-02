
import MainIcon from './MainIcon/MainIcon';
import intagram from '../../assets/instagram-icon.svg';
import youtube from '../../assets/youtube-icon.svg';
import tikTok from '../../assets/tik-tok-icon.svg';
import { LayoutContext } from '../../context/LayoutContext';
import { useContext } from 'react';

//Componente BaseBoard

function BaseBoard(){
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    return(<footer className={'z-index : 0'}>
        <div className={'flex flex-col items-center justify-evenly w-full bg-[#D7F1F9] h-[230px] mt-auto'}>
            <div className={`flex items-center justify-evenly ${isDesktop ? 'gap-x-[700px]' : isTablet ? 'gap-x-[300px]' : 'gap-x-[20px]'}`}>
               <MainIcon/>
                <div className={`flex items-center justify-center ${isMobile ? 'gap-x-[12px]' : ' w-[235px] gap-x-[25px]'}`}>
                    <img className={'w-[54px] h-[54px] duration-300 drop-shadow-lg  hover:scale-110'} src={intagram}></img>
                    <img className={'w-[54x] h-[44px] duration-300 drop-shadow-lg  hover:scale-110'} src={youtube}></img>
                    <img className={'w-[45x] h-[45px] duration-300 drop-shadow-lg  hover:scale-110'} src={tikTok}></img>
                </div>
            </div>
            <div className={`flex flex-col items-center justify-center h-[90px] text-center ${isMobile ? 'text-[14px]' : 'text-[16px]'} font-Inter-regular `}>
                <p className={'drop-shadow-2xl'}>Wille freezze Serviços de Varejo do Brasil Ltda. | CNPJ XX.XXX.XXX/XXXX-XX</p>
                <p>Av. dos Mamíferos Gelados, S/N, Polo Leiteiro do Vale Glacê, Peixeboiópolis - SP CEP: 55.505-000</p>
            </div>      
        </div>
    </footer>
    );
}

export default BaseBoard;