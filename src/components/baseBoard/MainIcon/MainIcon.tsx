import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router';
function IconMenus() {
    const Navigate = useNavigate();
    // Quando o icone for clicado vai para a rota "/"
    return(<>
        <img onClick={() =>Navigate('/')} className={'w-[120px] h-[120px] drop-shadow-lg duration-300 transform ease-in-out hover:scale-110'} 
        src={logo} alt="logo"/>
    </>);
}

export default IconMenus;