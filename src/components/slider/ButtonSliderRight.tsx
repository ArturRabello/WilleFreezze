import btnRight from '../../assets/btnRight.svg';

// botão de retornar
interface ButtonSlideRightProps {
  swiperRef:any;
}

function ButtonSlideRight({swiperRef}: ButtonSlideRightProps) {
    return(<>
<button  onClick={() => swiperRef.current?.slideNext()} className={' flex items-center justify-center z-2 absolute h-[58px] w-[58px] right-[32px] outline: none box-shadow: none focus:outline-none hover:scale-110 '}>
            <img src={btnRight} alt="Proximo"></img>
        </button>
    </>
    );
}

export default ButtonSlideRight;