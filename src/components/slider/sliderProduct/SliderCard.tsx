
import { useRef, useState, useEffect, type ForwardedRef } from 'react';
import ButtonSliderRight from '../ButtonSliderRight.tsx'
import ButtonSliderLeft from '../ButtonSliderLeft.tsx'
import CardProduto from './CardProduto.tsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import { useImage } from '../../../context/image/ImageContext.tsx';

//componete de slide de produtos

interface sliderCardsProps {
    IceCreemTypes: {
        type: string;
        flavers: {
            name: string;
            price: number;
            img: string;
            description: string;
            id: string;
            quantidade: string;
        }[];
    },
    isDesktop: any;
    isTablet: any;
    isMobile: any;
    ref: ForwardedRef<HTMLDivElement>;
}


function SliderCards({ IceCreemTypes, isDesktop, isTablet, isMobile, ref }: sliderCardsProps) {
    const { imagesDone } = useImage();
    const qntCards = IceCreemTypes.flavers.length; 
    const visibleCards = isDesktop ? 4 : 2;
    const swiperRef = useRef<SwiperCore>(null);

    const [swiperKey, setSwiperKey] = useState(0);
    // Atualiza o swiper quando as dimensões mudarem
    //o swiper às vezes não reage bem as mudanças de tamanho, ele precisa ser re-renderizado
    useEffect(() => {
        setSwiperKey((prevKey) => prevKey + 1);
    }, [isDesktop, isTablet, isMobile]);

    return (
        <div ref={ref} className={`flex flex-col items-center pb-[20px]`}>
            {/* titulo do slide */}
            <div className={`flex h-[100px] items-center justify-center rounded-[12px] ${isDesktop ? 'w-[1300px] pr-[720px]' : isTablet ? 'w-[768px] pr-[320px]' : 'max-w-[320] pr-[20px] '}`}>
                <h1 className={'text-[32px] font-Poppins font-bold text-[#666666] font-Poppins-bold'}>{IceCreemTypes.type}</h1>
            </div>
            {/* slide de produtos */}
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
                    {...isMobile ? { slidesPerView: 1 } : { slidesPerView: visibleCards }}
                    spaceBetween={0}
                    {...isMobile && { centeredSlides: true }}
                    className={`${isDesktop ? 'w-[1200px] h-[480px]' : isTablet ? 'w-[768px] h-[440px]' : ' w-[320px] h-[440px]'} rounded-[12px]`}
                    loop={true}
                >
                    {/* cards de produtos */}
                    {IceCreemTypes.flavers.map((flavers, index) => (    
                        //Por padrão o Swipper vem como display: Block, por isso estou forçando atraves do "!flex" a utilização do flexBox.
                        <SwiperSlide key={index} className={`!flex !items-center !justify-center ${isMobile && ('!max-w-[425px] !min-w[375px] !h-[440px]')}`}>
                            <CardProduto
                                name={flavers.name}
                                price={flavers.price}
                                img={imagesDone[flavers.id]}
                                description={flavers.description}
                                id={flavers.id}
                                quantidade={flavers.quantidade} 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* botão de navegação */}
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