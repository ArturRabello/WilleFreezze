import React, { useState } from "react";
import lessIcon from "../assets/lessIcon.svg";
import lessIconError from "../assets/lessIconError.svg";
import moreIcon from "../assets/moreIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import  { type AppDispatch, type RootState } from "../app/store";
import { addQuantity, removeQuantity } from "../features/basket/basketSlice";

// Contador de produtos
function CountCart({ count, id }: { count: number, id: string }) {
    
    const [isCount, setCount] = useState(count);
    const dispatch = useDispatch<AppDispatch>();
    const product = useSelector((state: RootState) => state.product.flaversType.flatMap(ft => ft.flavers));
    const productExist = product.find((p) => p.id === id);
    const currentUserId = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.id);
    const [qntLimite, setQntLimite] = React.useState(false);
    
    //função aumentar contador
    const handlePlusCount = () => {
        if(!productExist) return console.warn("Produto não encontrado");
        if(productExist.quantidade > isCount){
            dispatch(addQuantity({userId: currentUserId!, id: id}));
            setCount(isCount + 1);
            qntLimite && setQntLimite(false);
        }else{
            return setQntLimite(true);
        }
    }

    // função reduzir contador
    const handleMinusCount = () => {
        if(!productExist) return console.warn("Produto não encontrado");
        dispatch(removeQuantity({userId: currentUserId!, id: id}));
        setCount(isCount - 1);
        qntLimite && setQntLimite(false);
    } 

    return(
        <div className="flex items-center gap-x-2 ">
            <div className={`flex bg-white justify-around items-center w-[98px] h-[28px] ${qntLimite ? 'border-[#FF0000]' : 'border-[#D4D4D4]'} border-[2px] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}>
                {/* botão de menos */}
                <button onClick={() => handleMinusCount()} className="flex justify-center items-center w-[30px] h-[30px]">
                    <img src={qntLimite ? lessIconError : lessIcon} className="w-[10px] h-[10px] "></img>
                </button>
                {/* valor do contador */}
                <div className={`h-py ${qntLimite ? 'bg-[#FF0000]' : 'bg-[#D4D4D4]'} bg-[#D4D4D4] h-[28px] w-[1px]`}></div>
                    <p className={`w-[30px] text-center text-bold ${qntLimite ? 'text-[#FF0000]' : 'text-[#0097C4]'}`}>{isCount}</p>
                <div className={`h-py ${qntLimite ? 'bg-[#FF0000]' : 'bg-[#D4D4D4]'} h-[28px] w-[1px]`}></div>
                {/* botão de mais */}
                <button onClick={() => handlePlusCount()} className="w-[30px] h-[30px] flex justify-center items-center">
                    <img src={qntLimite ? lessIconError : moreIcon} className="w-[10px] h-[10px]"></img>
                </button>
            </div>
        </div>
    );
}

export default CountCart;