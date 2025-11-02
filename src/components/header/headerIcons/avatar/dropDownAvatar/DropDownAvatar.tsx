import { useNavigate } from "react-router";
import type { RootState } from "../../../../../app/store";
import { useSelector } from "react-redux";
import purchases from '../../../../../assets/purchase.svg'
import iceCreamIcon from '../../../../../assets/iceCreamIcon.svg'
import people from '../../../../../assets/people_icon.svg'
import userIcon from '../../../../../assets/user_icon.svg'

interface DropDownAvatarProps {
     handlerLogout: () => void,
}

export function DropDownAvatar({handlerLogout}:  DropDownAvatarProps){ {
    const Navigate = useNavigate();
    const isloggedIn = useSelector((state: RootState) => state.auth.sessionUser.isLogged);
    const currentUser = useSelector((state: RootState) => state.auth.sessionUser.currentUser);
    return(
        <div className='flex flex-col items-center justify-center absolute top-[79px] gap-y-5 border-2 border-[#0097C4] rounded-[5px]'>
            {/*opções do menu avatar*/}
            <div className='text-center bg-[#D7F1F9] shadow-lg p-2 w-[130px]  font-Inter-regular'>
                {/*Logar ou deslogar*/}
                <div onClick={() => {Navigate('/login'), handlerLogout()}} className="flex items-center justify-start gap-x-1 py-[8px] transform ease-in-out drop-shadow-lg hover:scale-103 ">
                    {/*verifica se o usuario esta logado, de qualquer forma leva para a tela de login*/}
                    <img src={userIcon} alt="Avatar" className={'w-[32px] h-[32px] duration-300 '}></img>
                    {isloggedIn ?
                    <p  className='text-[#0097C4] p-[1px]'>Logout</p>
                    :
                    <p className='text-[#0097C4] p-[1px]'>Login</p>}
                </div>
                <div className="border-t border-2 h-[2px] border-[#0097C4] opacity-70"></div>
                {/*verifica se o usuario é admin*/}
                {currentUser?.role === 'admin' ?
                    <>
                        {/*opções admin*/}
                        {/*acessar produtos*/}
                        <div onClick={() => Navigate('/ProductController')} className="flex items-center justify-start gap-x-1 py-[8px] transform ease-in-out drop-shadow-lg hover:scale-103">
                            <img src={iceCreamIcon} alt="iceCreamIcon" className="w-[32px] h-[32px]"></img>
                            <p className="text-[#0097C4] p-[1px]  ">Products</p>
                        </div>
                        <div className="border-t border-2 border-[#0097C4] opacity-70"></div>
                        {/*acessar Users*/}
                        <div onClick={() => Navigate('/UsersController')} className="flex items-center justify-start gap-x-1 py-[8px] transform ease-in-out drop-shadow-lg hover:scale-103">
                            <img src={people} alt="people" className="w-[32px] h-[32px]"></img>
                            <p className="text-[#0097C4] p-[1px]">People</p>
                        </div>
                        <div className="border-t border-2 h-[2px] border-[#0097C4] opacity-70"></div>
                    </>

                    :
                    <>
                        {/*opções user*/}
                        {/*acessar compras*/}
                        <div onClick={() => Navigate('/Mypurchases')} className="flex items-center justify-start gap-x-1 py-[8px] transform ease-in-out drop-shadow-lg hover:scale-103">
                            <img src={purchases} alt="Purchases" className={'w-[32px] h-[32px]'}></img>
                            <p onClick={() => Navigate('/Mypurchases')} className='text-[#0097C4] p-[px]'>Purchases</p>
                        </div>
                        <div className="border-t  border-2 border-[#0097C4] opacity-70"></div>
                    </>
                }
            </div>
        </div>
    )
}}