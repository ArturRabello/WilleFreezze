import { useNavigate } from "react-router";
import {ImageSkeleton}from "../../ImageSkeleton";
import { useState } from "react";

// Componente de card de produto
interface CardProdutoProps {
    name: string;
    price: number;
    img: string;
    description: string;
    id: string;
    quantidade: string;
}

function CardProduto({name, price, img, description, id, quantidade}: CardProdutoProps) {
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();

    // Função para navegar para a página de detalhes do produto
     const handleCardClick = () => {
        Navigate(`/product/${name}/${id}`, {
            state: {
                name: name,
                price: price,
                img: img,
                description: description,
                id: id,
                quantidade: quantidade
            },
        });
    };

    return (
        <div onClick={handleCardClick} className={' grid  gap-[10px] w-[240px] h-[422px] rounded-[24px] duration-300 shadow-lg hover:scale-105'}>
            <div>
                {/* caso a imagem nao esteja carregada, mostra um skeleton */}
                 {loading && <ImageSkeleton width="w-[240px]" height="h-[240px]" />}
                <img src={img} alt={name} onLoad={() => setLoading(false)} className={`w-[240px] h-[240px] rounded-t-[24px] object-cover ${loading ? 'hidden' : ''}`}/>
            </div>
            <h3 className={'text-[24px] pl-[20px] max-w-198 break-words font-Inter-regular'}>{name}</h3>
            <p className={'font-inter  text-[14px] pl-[20px] max-w-[198px] break-words min-h-[lem * 1.5 * 2] font-Inter-regular'}
                style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
            <p className={'font-Roboto  text-[21px] pl-[20px] mb-[12px] max-w-198  break-words'}>{price.toLocaleString('pt-BR', ({style: 'currency', currency: 'BRL'}))}</p>
        </div>
    );
}

export default CardProduto;