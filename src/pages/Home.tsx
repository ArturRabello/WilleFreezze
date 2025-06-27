
import Header from '../components/Header.tsx';
import MenuDesktop  from '../components/MenuDesktop.tsx';
import SliderBanner from '../components/slider/sliderBanner/SliderBanner.tsx';
import SliderCards from '../components/slider/sliderProduct/SliderCard.tsx';
import BaseBoard from '../components/BaseBoard.tsx';
import { useSelector, } from 'react-redux';
import banner_1 from '../assets/banner1.svg'
import { LayoutContext } from '../context/LayoutContext.tsx';
import { useContext } from 'react';


interface Flavers {
    name: string;
    price: number;
    img: string;
    description: string;
    id: number;
}

interface IceCreamTypes {
    type: string;
    flavers: Flavers[];
}

function Home() {
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    const products = useSelector((state: any) => state.product.flaversType);
    const IceCreemTypes: IceCreamTypes[] = products.map((p: any) => ({type: p.type, flavers: p.flavers}));
    
    const imgBanner = [
            banner_1,
            banner_1,
        ]

    
    return (
        <div className={'bg-[#F1F1F1] h-screen'}>
            <Header  isDesktop={isDesktop} isTablet ={isTablet} isMobile={isMobile}/>
            {isDesktop && <MenuDesktop/>}
            {(isDesktop || isTablet) && <SliderBanner img={imgBanner} isDesktop={isDesktop}/>}
            {isMobile && <div className='pt-[130px]'></div>}
            {IceCreemTypes.map((IceCreemTypes, index) => <SliderCards key={index} IceCreemTypes={IceCreemTypes} isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile}/>)}
            <BaseBoard isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile}/>
        </div>
    );
}

export default Home;