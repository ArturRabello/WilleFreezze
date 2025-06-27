import { useState } from 'react';
import AvatarSVG from '../../assets/avatar.svg';
import { useDispatch, useSelector } from 'react-redux';
import {islogout} from '../../features/auth/authSlice';
import {type RootState, type AppDispatch} from '../../app/store';
import { useNavigate } from 'react-router';
function Avatar(){
    const Navigate = useNavigate();
    const isloggedIn = useSelector((state: RootState) => state.auth.sessionUser.isLogged);
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);


    const handlerLogout = () => {
        dispatch(islogout());
    }

    return(
        <div onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className='flex items-col justify-center hover:cursor-pointer '>
            <img src={AvatarSVG} alt="Avatar" className={'relative w-[40px] h-[40px] duration-300 transform ease-in-out drop-shadow-lg hover:scale-110 '}></img>
            {isOpen && 
                <div className='flex flex-col items-center justify-center absolute top-[79px]'>
                    <div className='text-center bg-[#D7F1F9] shadow-lg p-2 w-[86px] rounded-[5px]'>
                        {isloggedIn ? <p onClick={() => (handlerLogout(), Navigate('/login'))} className='text-[#0097C4] p-[px] font-bold '>Logout</p>
                        : <p onClick={() => Navigate('/login')} className='text-[#0097C4] p-[px] font-bold '>Login</p>}
                     </div>
                </div>
                
            }
        </div>
    
    );
}

export default Avatar;