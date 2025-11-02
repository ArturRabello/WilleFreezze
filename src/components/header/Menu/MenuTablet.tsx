import {useState, useEffect, useRef} from 'react';
import MenuIcon from '../../../assets/menu.svg';
import Close from '../../../assets/close.svg';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { islogout } from '../../../features/auth/authSlice';
import { type RootState } from '../../../app/store';

// Componete que representa o menu tablet e mobile
function MenuTablet({ isTablet }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const roleUser = useSelector((state: any) => state.auth.sessionUser.currentUser?.role);
    const isloggedIn = useSelector((state: RootState) => state.auth.sessionUser.isLogged);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Desloga o usuario
    const handlerLogout = () => {
            dispatch(islogout());
    }

    // fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isOpen]);

    return (<>
        {/* Botao para abrir o menu */}
        <button onClick={() => setIsOpen(!isOpen)}>
            <img src={MenuIcon} className={'w-[80px] h-[80px]'}></img>
        </button>
        {/* Menu */}
        {isOpen &&
            <div ref={menuRef}
                className={`flex absolute z-3 flex-col justify-start 
                    right-0 bg-gradient-to-b from-[#0097C4] to-[#0077A3] 
                        drop-shadow-lg  top-0 h-screen  ${isTablet ? 'w-[300px]' : 'w-[200px]'}`}>

            {/* Botao para fechar o menu */}
                <button onClick={() => setIsOpen(false)} className={`${isTablet ? 'pl-[190px]' : 'pl-[100px]'} pt-[25px] w-full h-[80px] font-bold text-[24px] text-[#D7F1F9]`}>
                    <img src={Close} className={'w-[80px] h-[80px]'}></img>
                </button>
                {/* lista de opcoes */}
                <ul className='grid gap-2 text-[32px] pt-[40px] pl-[25px] font-Inter-regular text-[#D7F1F9]'>
                    <li onClick={() => navigate('/')}>Home</li>
                    {/* verifica se o usuario é admin ou user*/}
                    {roleUser === 'user' ?
                        <>
                            <li onClick={() => navigate('/basket')}>Cesta</li>
                            <li onClick={() => navigate('/MyPurchases')}>Pedidos</li>
                        </>
                        :
                        <>
                            <li onClick={() => navigate('/ProductController')}>Produtos</li>
                            <li onClick={() => navigate('/UsersController')}>Users</li>
                        </>
                     }
                    {/*opção de logout ou login, depende se o usuario estiver logado ou nao*/}
                    {isloggedIn ? <li onClick={() => (handlerLogout(), navigate('/login'))}>Logout</li> : <li onClick={() => navigate('/login')}>Login</li>}
                </ul>
            </div>
        }
    </>
    );
}

export default MenuTablet;