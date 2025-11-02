
import Header from '../components/header/Header.tsx';
import MenuDesktop from '../components/header/Menu/MenuDesktop.tsx';
import SliderBanner from '../components/slider/sliderBanner/SliderBanner.tsx';
import SliderCards from '../components/slider/sliderProduct/SliderCard.tsx';
import BaseBoard from '../components/baseBoard/BaseBoard.tsx';
import { useSelector, } from 'react-redux';
import banner_1 from '../assets/banner1.svg'
import { LayoutContext } from '../context/LayoutContext.tsx';
import { useContext, useRef } from 'react';

// página principal
interface Flavers {
    name: string;
    price: number;
    img: string;
    description: string;
    id: string;
    quantidade: string;
}

interface IceCreamTypes {
    type: string;
    flavers: Flavers[];
}

function Home() {
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    const products = useSelector((state: any) => state.product.flaversType);
    const IceCreemTypes: IceCreamTypes[] = products.map((p: any) => ({ type: p.type, flavers: p.flavers }));
    const sectionEspecialRef = useRef<HTMLDivElement>(null);
    const sectionClassicRef = useRef<HTMLDivElement>(null);

    //scroll to section 
    const goToEspecialSection = () => {
        sectionEspecialRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const goToClassicSection = () => {
        sectionClassicRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    //pega a ref de cada seção
    //A ref é enviado para o componente SliderCards e usado para fazer o scroll
    const getSectionRefType = (typeName: string) => {
        switch  (typeName.toLowerCase()){
            case 'sabores especiais':
                return sectionEspecialRef;
            case 'sabores classicos':
                return sectionClassicRef;
            default:
                return null;
        }
    }

    //imagens do banner
    const imgBanner = [
        banner_1,
        banner_1,
    ]

    return (
        <div>
            <Header />
            {/* menu desktop */}
            {isDesktop && <MenuDesktop goToEspecialSection={goToEspecialSection} goToClassicSection={goToClassicSection} />}
            {/* slider banner */}
            {(isDesktop || isTablet) && <SliderBanner img={imgBanner} isDesktop={isDesktop} />}
            {isMobile && <div className={`${isDesktop ? 'pt-[120px]' : 'pt-[20px]'}`}></div>}
            {/* slider cards */}
            {IceCreemTypes.map((IceCreemTypes, index) =>{
                const ref = getSectionRefType(IceCreemTypes.type);
                return(
                    <SliderCards key={index} IceCreemTypes={IceCreemTypes} isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} ref={ref}/>
                )
            })}
            <BaseBoard />
        </div>
    );
}

export default Home;