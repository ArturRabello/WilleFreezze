import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../app/store';
import { login, ClearError, } from '../../features/auth/authSlice';
function FormLogin({setIsForm, isTablet, isDesktop}: any) {
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.auth.error);
    const isLoggedIn = useSelector((state: RootState) => state.auth.sessionUser.isLogged);

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(formData));
        console.log(isLoggedIn);
    }


    return (
        <form  onSubmit={handlerSubmit}  className={`flex flex-col   gap-y-[20px] ${isTablet && 'pr-[45px]'}`}>
            <div className='flex flex-col gap-y-[10px] items-center justify-between '>
                <input type="text" name="email" onChange={handlerChange} placeholder="Email" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] font-roboto  ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}></input>
                <input type="password" name='password' onChange={handlerChange} placeholder="Senha" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] focus:outline-[#0097C4] ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}></input>
            </div>
            <p className='text-center text-red-600'>{error}</p>
            <div className={'flex flex-col gap-y-[10px] items-center justify-between text-white font-label'}>
                <button type="submit" className='bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] hover:scale-104'>Login</button>
                <button type="button" onClick={() => (setIsForm('register'), dispatch(ClearError()))} className='bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] hover:scale-104'>Register</button>
            </div>
        </form>
    )
}

export default FormLogin