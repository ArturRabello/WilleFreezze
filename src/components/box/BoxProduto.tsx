import { useContext, useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router';
import { LayoutContext } from "../../context/LayoutContext";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../app/store";
import { addProductBasket } from "../../features/basket/basketSlice";
import { ImageSkeleton } from "../ImageSkeleton";

// Componente com dados do produto
function BoxProduto() {
    const { isDesktop, isTablet} = useContext(LayoutContext);

    const location = useLocation();
    const navigate = useNavigate();

    //pegando dados passados dos cards de produtos
    const { name, price, img, description, id} = location.state;
    const pathParts = location.pathname.split('/');

    const dispatch = useDispatch<AppDispatch>()
    
    const currentUserId = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.id)
    const products = useSelector((state: RootState) => state.product.flaversType.flatMap(ft => ft.flavers));

    const productExist = products.find((p) => p.id === id);
    
    const [cepData, setCepData] = useState('');
    const [cep, setCep] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(true);
    
    //verificando cep
    useEffect(() => {
        const fetchCep = async (cepData: string) => {
            try {
                const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepData}`)
                if (!res.ok) {
                    setCep(false)
                    return;
                }
                const data = await res.json()
                if (data.cep) {
                    setCep(true)
                    return
                }
                if (cepData.length === 8) {
                    setCep(true)
                    return
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchCep(cepData)
    }, [cepData]) 

    // Função para capturar os dados do formulário
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCepData(e.target.value);
    }
    
    // Função para enviar o formulário e adicionar o produto ao carrinho
    // verifica se o cep foi preenchido e se o produto existe
    const handlerAddBasketClick = async() =>{
            if(cep && productExist){
                if(productExist.quantidade > 0){
                    dispatch(addProductBasket({userId: currentUserId ?? "", product: location.state}))
                    navigate("/basket")
                }else{
                    setAlertMessage("Sabor esgotado");
                }
            }else{
                setAlertMessage("CEP inválido");
            }
    }
    
    return (
        <div>
            <div className={`flex justify-center ${isDesktop ? 'pt-[40px] pr-[580px] pb-[10px]' : 'pt-[20px]'}`}>
                {/*Exibe o caminho da navegação*/}
                <p className="text-[20px] text-[#0097C4] font-bold">
                    <span className="">Home</span>
                    {pathParts.slice(0, -1).map((part, index) =>
                        <span key={index} className="font-Inter-regular">
                            {part}
                            {index !== pathParts.length - 2 && ' > '}
                        </span>)}
                </p>
            </div>
            {/*dados do produto*/}
            <div className={`flex justify-center  ${isDesktop ? 'h-[600px] pb-[40px]' : ' pb-[40px] '}`}>
                <div className={` flex items-center justify-evenly gap-x-[40px] rounded-[12px] ${isDesktop ? ' shadow-lg  w-[956px] h-[470px] bg-[#D7F1F9] ' : isTablet ? 'w-[668px] h-[470px]' : ' flex-col w-[320px] h-[770px]'} `}>
                    {/*Imagem do produto*/}
                    <div>
                        {loading && <ImageSkeleton width={isDesktop ? "w-[400px]" : isTablet ? "w-[300px]" : "w-[320px]"} height={isDesktop ? "h-[400px]" : isTablet ? "h-[300px]" : "h-[320px]"} />}
                        <img src={img} alt="" onLoad={() => setLoading(false)} className={` ${loading ? 'hidden' : ''} ${isDesktop ? 'w-[416px] h-[416px]' : isTablet ? 'w-[350px] h-[350px]' : 'w-[280px] h-[280px]'} rounded-[12px] shadow-lg  `}></img>
                    </div>
                    <div className="flex flex-col items-center gap-y-5  w-[320px] ">
                        {/*dados do produto*/}
                        <h1 className="text-[40px] font-bold ">{name}</h1>
                        <p className="text-center max-w-[280px] h-[70px] scrollbar-custom  font-Inter-regular overflow-x-auto">
                            {description}
                        </p>
                        <input type="CEP" name="cep" onChange={handlerChange} placeholder="CEP" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[190px] h-[40px] font-roboto ${cep == true ? ' border-2 border-[#90EE90] outline-none' : ''}
                            ${isDesktop ? 'outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}>
                        </input>
                        {alertMessage == "CEP inválido" && <p className="text-center text-red-500 text-[20px] font-bold">{alertMessage}</p>}
                        <p className=" text-[36px] text-center font-Inter-regular font-semibold">{price.toLocaleString('pt-BR', ({ style: 'currency', currency: 'BRL' }))}</p>
                        {alertMessage == "Sabor esgotado" && <p className="text-center text-red-500 text-[20px] font-bold">{alertMessage}</p>}
                        {/*Botão para adicionar ao carrinho*/}
                        <button onClick={() => handlerAddBasketClick()} className=" font-Inter-regular w-[200px] h-[50px] bg-[#0097C4] rounded-[12px] shadow-lg text-white text-bold transition-300 hover:scale-105">
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoxProduto;