import {addProduct } from "../../features/product/productSlice";
import {useImage} from '../../context/image/ImageContext';
import { useContext, useState} from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { LayoutContext } from "../../context/LayoutContext";

// Componente formulário de cadastro de produtos

export function FormCreateProduct({ type, setModalOpen, setImages, Images }: { type: string, setModalOpen: (value: boolean) => void, setImages: (value: string[]) => void, Images: string[]}) {
    const [formData, setFormData] = useState({ id: '', name: '', price: 0, img: '', description: '', quantidade: 0});
    const dispatch = useDispatch<AppDispatch>();
    const { isDesktop, isTablet } = useContext(LayoutContext);
    const { saveImage } = useImage();
    const [isError, setIsError] = useState("");

    // Abre o modal de upload de imagens
    const handlerModalOpen = () => {
        setImages([]);
        setIsError("");
        setModalOpen(true);
    }

    // Função para capturar os dados do formulário
    // verifica o preço está com ponto ou virgula e transforma em numero
    // verifica se a quantidade tem apenas numeros.
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: name === 'price' ?
                Number(value.replace(',', '.'))
                : name === 'quantidade'
                    ? Number(value.replace(/\D/g, ''))
                    : value
        });
    };
    //Função para enviar o formulário
    // verifica se o formulário foi preenchido corretamente
    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const id = crypto.randomUUID()
        e.preventDefault();
        const isEmpty =
            formData.price === 0 ||
            formData.quantidade <= 0 ||
            formData.name === null ||
            formData.description === null ||
            Images.length === 0;

        if (isEmpty) {
            setIsError("Formulário incompleto"); // não enviar o formulário se estiver incompleto ou inválido
            setImages([]);
        }else{
            setFormData({...formData, id: String(id)});
            dispatch(addProduct({ type: type, flaver: formData }));
            saveImage(formData.id, Images[0]);
            setIsError("");
            setImages([]);
        }
    }

    return (
        <form onSubmit={handlerSubmit} className={`flex flex-col items-center justify-center ${isDesktop || isTablet ? 'w-[400px]' : 'w-[280px]'} h-[400px] gap-y-[60px] pb-[40px] ${!type && 'pointer-events-none opacity-50'}`}>
            {/* FORMULARIO DE CADASTRO DE PRODUTOS */}
            <div className="flex flex-col gap-y-[20px] items-center justify-between ">
                <input type="text" onChange={handlerChange} name="name" placeholder="Nome do produto" className={` pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] font-Inter-regular  ${isDesktop ? 'border-[#9E9E9E] border-2 outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}></input>
                <input type="text" onChange={handlerChange} name="description" placeholder="Descrição" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px]  font-Inter-regular${isDesktop ? ' border-[#9E9E9E] border-2 outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}></input>
                <input type="text" onChange={handlerChange} name="quantidade" placeholder="Quantidade" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] font-Inter-regular ${isDesktop ? 'border-[#9E9E9E] border-2 outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}></input>
                <input type="text" onChange={handlerChange} name="price" placeholder="Valor" className={`pl-[10px] bg-white rounded-[5px] shadow-lg w-[240px] h-[40px] font-Inter-regular  ${isDesktop ? 'border-[#9E9E9E] border-2 outline-[#0097C4]' : 'border-2 border-[#0097C4] outline-none'}`}></input>  
            </div>
            {/* botões */}
            <div className="flex flex-col gap-y-[10px] items-center justify-between text-white font-label">
                {Images.length > 0 && <p className="text-center font-bold  text-green-600 text-[20px] font-Inter-regular">Imagem adicionada</p>}
                {isError && <p className="text-center font-bold  text-red-600 text-[20px]">{isError}</p>}
                <button type="button" onClick={() => handlerModalOpen()} className="bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] transition-300 hover:scale-104 font-Inter-regular">Adicionar Imagem</button>
                <button type="submit" className="bg-[#0097C4] rounded-[25px] shadow-lg w-[180px] h-[45px] transition-300 hover:scale-104 font-Inter-regular">Adicionar</button>
            </div>
        </form>
    )
}