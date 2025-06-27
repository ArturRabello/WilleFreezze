
import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {type RootState, type AppDispatch} from '../../app/store';
import { register, ClearError} from '../../features/auth/authSlice';

function FormRegister({ setIsForm, isMobile, isDesktop }: any) {
        const dispatch = useDispatch<AppDispatch>();
        const error = useSelector((state: RootState) => state.auth.error);

        const [formsData, setFormData] = useState({
            fullName: String(),
            email: String(),
            cpf: String(),
            dateOfBirth: String(),
            password: String(),
            confirmPassword: String(),
        });

        const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formsData, [e.target.name]: e.target.value });
        };

        const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(register(formsData));
        };

    return (
        <form onSubmit={handlerSubmit} className={`flex ${isMobile && 'justify-center pt-[50px] pb-[50px]'} flex-col gap-y-[20px]`}>
            <div className={`flex ${isMobile ? 'flex-col gap-y-[20px]' : 'flex-row gap-x-[20px]'}`}>
                <input name = "email" onChange={handlerChange} type="text" placeholder="Email" className={` pl-20px pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] font-roboto  ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}/>
                <input name = "fullName" onChange={handlerChange} type="text" placeholder="Nome Completo" className={`pl-20px pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}/>
            </div>
            <input type="number" name = "cpf" onChange={handlerChange} placeholder="CPF" className={`pl-20px pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}/>
            <div>
                <input type="date" name='dateOfBirth' onChange={handlerChange}  placeholder="Data de Nascimento" className="pl-20px pl-[10px] border-[#0097C4] border-2 rounded-[5px] shadow-lg w-[240px] h-[40px] " />
            </div>
            <div className={`flex ${isMobile ? 'flex-col gap-y-[20px]' : 'flex-row gap-x-[20px]'}`}>
                <input type="password" name = "password" onChange={handlerChange}  placeholder="Senha" className={`pl-20px pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}/>
                <input type="password" name = "confirmPassword" onChange={handlerChange} placeholder="Confirmar Senha" className={`pl-20px pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] ${isDesktop ? ' outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}/>
            </div>
            <div className='flex flex-row justify-center'><p className=" word-wrap text-red-600">{error}</p></div>
            <div className={`flex ${isMobile ? 'flex-col gap-y-[10px]' : 'flex-row gap-x-[20px] pb-[20px]'} pt-[20px] items-center justify-evenly text-white font-label`}>
                <button type="button" onClick={() => (setIsForm('login'), dispatch(ClearError()))} className="bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] hover:scale-104">Login</button>
                <button type="submit" className="bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] hover:scale-104">Register</button>
            </div>
        </form>
    )
}

export default FormRegister;