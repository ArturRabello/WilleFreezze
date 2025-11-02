
import { useNavigate } from 'react-router';
import BasketIcon from '../../../assets/shopping_basket.svg'

//Componente do icone do carrinho
function Basket() {
    const navigate = useNavigate();
    // Quando o icone for clicado vai para a rota "/basket"
    const handlerClick = () =>{
        navigate("/basket")
    }

    return (
        <img onClick={ () => handlerClick()} src={BasketIcon} alt="Avatar" className={'duration-300 transform ease-in-out drop-shadow-lg hover:scale-110'}></img>
    )


}

export default Basket;