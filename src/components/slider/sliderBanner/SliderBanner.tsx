
import ButtonSliderRight from '../ButtonSliderRight.tsx'
import ButtonSliderLeft from '../ButtonSliderLeft.tsx'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';

interface sliderBannerProps{
    img: string[];
    isDesktop: any;
}

function SliderBanner({img, isDesktop}: sliderBannerProps){
    const swiperRef = useRef<SwiperCore>(null);

    return(
        <div className={` ${isDesktop ? 'pt-[40px]' : 'pt-[129px]'} flex items-center justify-center  pb-[40px] `}>
            <div className={` flex items-center relative ${isDesktop ? 'w-[1082px] h-[502px]  rounded-[12px]' : 'w-[768px] h-[402px]'}  overflow-hidden shadow-['0px 4px 4px rgba(0, 0, 0, 0.25)']`}
             style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}> 
             <Swiper
                modules={[Autoplay]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                {...isDesktop && {allowTouchMove: false}}
                speed={800}
                slidesPerView={1}
                spaceBetween={0}
                className={` ${isDesktop ? 'w-[1082px] h-[502px]  rounded-[12px]' : 'w-[768px] h-[402px]'}`}
                loop={true}>
                {img.map((img, index) =>(
                    <SwiperSlide key={index} >
                    <img
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className={'w-full h-full object-cover'} 
                    />
                    </SwiperSlide>
                ))}
             </Swiper>
                <ButtonSliderRight swiperRef={swiperRef}/>
                <ButtonSliderLeft  swiperRef={swiperRef}/>
            </div>
        </div>
    );
}

export default SliderBanner;