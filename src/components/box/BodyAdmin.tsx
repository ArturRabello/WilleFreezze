import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import produtosCadastrados from "/src/assets/produtosCadastrados.svg";
import pessoasCadastradas from "/src/assets/pessoasCadastradas.svg";
import { useNavigate } from "react-router";
import { LayoutContext } from "../../context/LayoutContext";
import { useContext } from "react";

// Componente corpo da pagina admin
function BodyAdmin() {
    const Navigate = useNavigate();
    const {isDesktop, isTablet} = useContext(LayoutContext)
    const userName = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.fullName);
    
    return (
        <div className={`flex flex-col items-center  gap-y-[40px]  py-[50px]`}>
            <h1 className="text-[36px] font-bold font-Poppins-bold max-w-[310px] line-clamp-2 break-words ">Bem Vindo {userName}</h1>
            {/* Botoes de navegação para as telas de produtos e pessoas */}
            <div className={`flex gap-x-[120px] ${(isDesktop || isTablet) ? 'flex-row' : 'flex-col gap-y-[40px]'}`}>
                <img onClick={() => Navigate('/ProductController')} className="w-[288px] h-[432px] duration-300 drop-shadow-lg hover:scale-105" src={produtosCadastrados}></img>
                <img onClick={() => Navigate('/UsersController')} className="w-[288px] h-[432px] duration-300 drop-shadow-lg hover:scale-105" src={pessoasCadastradas}></img>
            </div>
        </div>
    )
}

export default BodyAdmin;