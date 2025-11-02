import { useState } from 'react';
import AvatarSVG from '../../../../assets/avatar.svg';
import { useDispatch} from 'react-redux';
import {islogout} from '../../../../features/auth/authSlice';
import { type AppDispatch} from '../../../../app/store';
import { DropDownAvatar } from './dropDownAvatar/DropDownAvatar';

// Icone de avatar
// contem um DropDownAvatar que aparece ao passar o mouse
function Avatar(){

    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);

    // função para deslogar
    const handlerLogout = () => {
        dispatch(islogout());
    }

    return(
        <div onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className='flex items-col justify-center hover:cursor-pointer '>
            <img src={AvatarSVG} alt="Avatar" className={'relative w-[40px] h-[40px] duration-300 transform ease-in-out drop-shadow-lg hover:scale-110 '}></img>
            {/*se isOpen for true, aparece o DropDownAvatar*/}
            {isOpen && 
                <DropDownAvatar handlerLogout={handlerLogout} />
            }
        </div>
    
    );
}

export default Avatar;