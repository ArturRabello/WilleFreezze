import { useState } from 'react';
import MenuIcon from '../../../assets/menu.svg'
import { useNavigate } from 'react-router';
import { islogout } from '../../../features/auth/authSlice';
import type { AppDispatch, RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';

// Componente de menu de navegação do cabeçalho desktop
function Menu({ goToClassicSection, goToEspecialSection }: any) {
    const [isHoverMenu, setIsHoverMenu] = useState(false);
    const [isHoverSubMenu, setIsHoverSubMenu] = useState(false);
    const Navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.sessionUser.isLogged);
    const dispatch = useDispatch<AppDispatch>();

    // Desloga o usuario
    const handlerLogout = () => {
        dispatch(islogout());
    }

    return (
        <div className={'flex justify-evenly  right-[260px] items-center bg-[#D7F1F9] h-[32px] font-Inter-regular '} style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div onMouseOver={() => setIsHoverMenu(true)} onMouseLeave={() => setIsHoverMenu(false)} >
                {/* Icone de menu */}
                <img src={MenuIcon} alt="menu" className={'z-1 p-x-[30px] w-[32px] h-[32px]  duration:300 hover:scale-110'}></img>
                {/* se isHoverMenu for true, aparece o menu*/}
                {isHoverMenu &&
                    <div className={'absolute top-37 bg-[#D7F1F9] w-[140px]  z-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer '}>
                        <ul className='grid row-span-3 border-[#0097C4] '>
                            {/* tipos de sorvete*/}
                            <li onMouseOver={() => setIsHoverSubMenu(true)} onMouseLeave={() => setIsHoverSubMenu(false)}
                                className='font-size-[14px] font-bold text-[#0097C4] p-[10px] bg-[#D7F1F9] border-b-[2px] border-[#0097C4] cursor-pointer hover:bg-[#0097C4]  hover:text-[#D7F1F9] '>
                                Sorvetes
                                {/* quando o tipo de sorvete for clicado, a tela dece até o slideCard do tipo selecionado*/}
                                {isHoverSubMenu &&
                                    <div className={'absolute left-[140px] top-0 bg-[#D7F1F9] w-[140px] z-2 border-l-[2px] border-[#0097C4] cursor-pointer'}>
                                        <ul className='grid row-span-3'>
                                            <li onClick={() => { console.log("clicou"); goToClassicSection(); }} className='font-size-[14px] font-bold text-[#0097C4] p-[10px] bg-[#D7F1F9] border-b-[2px] border-[#0097C4] cursor-pointer  hover:bg-[#0097C4] hover:text-[#D7F1F9] hover: font-bold'>
                                                Classicos
                                            </li>
                                            <li onClick={() => goToEspecialSection()} className='font-size-[14px] font-bold text-[#0097C4] p-[10px] bg-[#D7F1F9] cursor-pointer  hover:bg-[#0097C4] hover:text-[#D7F1F9] hover: font-bold'>
                                                Especiais
                                            </li>
                                        </ul>
                                    </div>}
                            </li>
                            {/* verifica se o usuario esta logado*/}
                            {isLoggedIn ?
                                <li onClick={() => (handlerLogout(), Navigate('/login'))} className='font-size-[14px] font-bold text-[#0097C4] p-[10px] bg-[#D7F1F9] border-b-[2px] border-[#0097C4] cursor-pointer  hover:bg-[#0097C4] hover:text-[#D7F1F9] hover: font-bold'>
                                    Logout
                                </li>
                                :
                                <li onClick={() => Navigate('/login')} className='font-size-[14px] font-bold text-[#0097C4] p-[10px] bg-[#D7F1F9] border-b-[2px] border-[#0097C4] cursor-pointer  hover:bg-[#0097C4] hover:text-[#D7F1F9] hover: font-bold'>
                                    Login
                                </li>
                            }
                            {/* leva para cesta*/}
                            <li onClick={() => Navigate('/basket')}
                                className='font-size-[14px] font-bold text-[#0097C4] p-[10px] bg-[#D7F1F9] cursor-pointer  hover:bg-[#0097C4] hover:text-[#D7F1F9] hover:font-bold'>
                                Cesta
                            </li>
                        </ul>
                    </div>}
            </div>
            <div className={'flex justify-end p-x-[30px] w-[902px] h-[32px] '}></div>

        </div>
    );
}

export default Menu;