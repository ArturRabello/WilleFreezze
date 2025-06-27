
import { useContext, useState } from 'react';
import Logo from '../assets/logo.png'
import FormLogin from '../components/forms/FormLogin.tsx';
import FormRegister from '../components/forms/FormRegister.tsx';
import { LayoutContext } from '../context/LayoutContext.tsx';


function LoginBox()
{
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    
    const [isform, setIsForm] = useState<'login' | 'register'>('login');

    return (
    <div className={`flex items-center justify-center ${isDesktop ? 'pt-[40px] pb-[60px]' : 'pt-[150px] '}`}>
        <div className={`flex items-center justify-center w-[956px] h-[524px]  rounded-[12px] ${(isform === 'login' ? ' gap-x-[130px]' : 'gap-x-[40px]')} ${isDesktop && 'shadow-lg bg-[#D7F1F9]'}`}>
            {(isDesktop || (isTablet  && isform === 'login')) && <img src={Logo} alt="Logo" className={'w-[330px] h-[320px] drop-shadow-lg'}></img>}
            {isform === 'login' ? <FormLogin setIsForm={setIsForm} isTablet={isTablet} isDesktop={isDesktop}/> : <FormRegister setIsForm={setIsForm} isMobile={isMobile} isDesktop={isDesktop}/>}
        </div>
    </div>
    )
}

export default LoginBox;