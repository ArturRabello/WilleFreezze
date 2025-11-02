import btnLeft from '../../assets/btnLeft.svg';

// botão de avançar do avançar
interface ButtonSlideLeftProps {
  swiperRef: any
}



function ButtonSlideLeft({swiperRef}: ButtonSlideLeftProps){
    return(<>
        <button onClick={() => swiperRef.current?.slidePrev()} className={'flex items-center justify-center absolute z-1 h-[58px] w-[58px] left-[32px] focus:outline-none active:outline-none outline-blue-500 hover:scale-110'}>
            <img src={btnLeft} alt="Anterior"></img>
        </button>
    </>
    );
}

export default ButtonSlideLeft;