
import { useRef, useState, useEffect, } from 'react';
import ButtonSliderRight from '../ButtonSliderRight.tsx'
import ButtonSliderLeft from '../ButtonSliderLeft.tsx'
import CardProduto from './CardProduto.tsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


interface sliderCardsProps {
    IceCreemTypes: {
        type: string;
        flavers: {
            name: string;
            price: number;
            img: string;
            description: string;
            id: number;
        }[];
    };
    isDesktop: any;
    isTablet: any;
    isMobile: any;
}

function SliderCards({ IceCreemTypes, isDesktop, isTablet, isMobile}: sliderCardsProps) {
    const qntCards = IceCreemTypes.flavers.length;
    const visibleCards = isDesktop ? 4 : 2;
    const swiperRef = useRef<SwiperCore>(null);

    const [swiperKey, setSwiperKey] = useState(0);  

    useEffect(() => {
        setSwiperKey((prevKey) => prevKey + 1);
    }, [isDesktop, isTablet, isMobile]);


    return (
        <div className={`flex flex-col items-center pb-[20px]`}>
            <div className={`flex h-[100px] items-center justify-center rounded-[12px] ${isDesktop ? 'w-[1300px] pr-[720px]' : isTablet ? 'w-[768px] pr-[320px]' : 'max-w-[320] pr-[20px] '}`}>
                <h1 className={'text-[32px] font-Poppins font-bold text-[#666666]'}>{IceCreemTypes.type}</h1>
            </div>
            <div className={`flex relative ${isDesktop ? 'w-[1150px]' : isTablet ? 'w-[620px]' : 'w-[320px] h-[440px]'} items-center justify-center `}>
                <Swiper
                    modules={[Autoplay]}
                    key={swiperKey}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    autoplay={{ delay: 7000, disableOnInteraction: false }}
                    {...isDesktop && { allowTouchMove: false }}
                    speed={600}
                    {...isMobile ? {slidesPerView: 1} : {slidesPerView: visibleCards}}
                    spaceBetween={0}
                    {...isMobile && {centeredSlides: true}} 
                    className={`${isDesktop ? 'w-[1200px] h-[480px]' : isTablet ? 'w-[768px] h-[440px]' : ' w-[320px] h-[440px]'} rounded-[12px]`}
                    loop={true}
                >
                    {IceCreemTypes.flavers.map((flavers, index) => (
                        //Por padrão o Swipper vem como display: Block, por isso estou forçando atraves do "!flex" a utilização do flexBox.
                        <SwiperSlide key={index} className={`!flex !items-center !justify-center ${isMobile && ('!max-w-[425px] !min-w[375px] !h-[440px]')}`}>
                                <CardProduto
                                    name={flavers.name}
                                    price={flavers.price}
                                    img={flavers.img}
                                    description={flavers.description}
                                    id={flavers.id}
                                />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {qntCards > visibleCards &&
                <>
                    <ButtonSliderRight swiperRef={swiperRef} />
                    <ButtonSliderLeft swiperRef={swiperRef} />
                </>
                }
            </div>
        </div>
    );
}




export default SliderCards;