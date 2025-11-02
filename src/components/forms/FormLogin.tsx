import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../app/store';
import { login, ClearError, } from '../../features/auth/authSlice';

// Componente formulário de login
function FormLogin({handleNavegation, setIsForm, isTablet, isDesktop}: any) {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.auth.users);
    const error = useSelector((state: RootState) => state.auth.error);

    const islogged = useSelector((state: RootState) => state.auth.sessionUser.isLogged);
    const [formData, setFormData] = useState({ email: '', password: '' });

    //verificar se o usuario esta logado e redirecionar para a pagina inicial
    //Efeito é executado sempre que o estado islogged for alterado
    useEffect(() => {
        if (islogged) {
            handleNavegation();
            ClearError();
        }
    }, [islogged]);

    // Função para capturar os dados do formulário
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // Função para enviar o formulário
    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const user = users.find((user) =>
             user.email === formData.email && user.password === formData.password);
        e.preventDefault()
        dispatch(login(user as any|| {}));
    }


    return (
        <form  onSubmit={handlerSubmit}  className={`flex flex-col   gap-y-[20px] ${isTablet && 'pr-[45px]'}`}>
            {/* Campo de email e senha */}
            <div className='flex flex-col gap-y-[10px] items-center justify-between '>
                <input type="text" name="email" onChange={handlerChange} placeholder="Email" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] font-roboto  ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'} font-Inter-regular`}></input>
                <input type="password" name='password' onChange={handlerChange} placeholder="Senha" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] focus:outline-[#0097C4] ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none '} font-Inter-regular`}></input>
            </div>
            {/* exibir mensagem de erro */}
            <p className='text-center text-red-600'>{error}</p>
            {/* botões de login e register */}
            <div className={'flex flex-col gap-y-[10px] items-center justify-between text-white font-label'}>
                <button type="submit" className='font-Inter-regular bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] hover:scale-104 '>Login</button>
                <button type="button" onClick={() => (setIsForm('register'), dispatch(ClearError()))} className='font-Inter-regular bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] hover:scale-104'>Register</button>
            </div>
        </form>
    )
}

export default FormLogin