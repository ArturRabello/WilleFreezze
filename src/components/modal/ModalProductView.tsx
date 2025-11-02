
import removeModal from '../../assets/removeModal.svg';
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { LayoutContext } from "../../context/LayoutContext";
import { useContext } from "react";
import { useImage } from "../../context/image/ImageContext";

// Modal de visualização de produto

export function ModalProductView({modalProductViewClose, selectedProductId}: {modalProductViewClose: () => void, selectedProductId: string | null}) {
  const { isDesktop,isTablet, isMobile } = useContext(LayoutContext);
  const products = useSelector((state: RootState) => state.product.flaversType.flatMap(type => type.flavers));
  const product = products.find(p => p.id === selectedProductId);

  const { imagesDone } = useImage();
    return(
        <div className="fixed inset-0 z-10 bg-gray-500/30 flex items-center justify-center">
      <div className={`grid  ${isMobile ? 'grid-cols-[80px_1fr_50px] grid-rows-[80px_1fr_1fr]' : 'grid-cols-[250px_1fr_80px] grid-rows-[80px_1fr]'} grid-rows-[80px_1fr] bg-white ${isDesktop ? 'w-[800px] h-[400px]' : isTablet ? 'w-[700px] h-[400px]' : 'w-[280px] h-[530px]'} z-20 rounded-xl shadow-2xl overflow-hidden`}>
        
        {/* HEADER - TÍTULO (centro) */}
        <div className={`col-start-1 col-span-2 row-start-1 break-words whitespace-normal flex items-center ${isMobile ? 'pl-[40px]' : 'pl-[120px] '}  bg-white`}>
          <h1 className={`font-Poppins-bold text-[28px] text-gray-900 ${isMobile ? 'truncate max-w-[200px] ' : ''}`}>{product?.name}</h1>
        </div>

        {/* HEADER - BOTÃO FECHAR (direita) */}
        <div className="col-start-3 row-start-1 flex items-center justify-center">
            <img onClick={() => modalProductViewClose()} src={removeModal} className="w-[50px] h-[50px]"></img>
        </div>

        {/* CONTEÚDO - IMAGEM (esquerda) */}
        <div className={`flex justify-center p-6 ${isMobile ? 'col-start-1 col-end-4 row-start-2 ' : 'col-start-1 row-start-2'} `}>
            <img   src={product ? imagesDone[product.id] ?? "" : ""}  className="w-full h-full object-contain rounded-lg"/>
        </div>

        {/* CONTEÚDO - DESCRIÇÃO E PREÇO (direita) */}
        <div className={`flex flex-col bg-white ${isMobile ? 'col-start-1 col-end-4 col-span-2 row-start-3 justify-start px-8' : 'col-start-2 col-span-2 row-start-2 justify-between p-8'} font-Inter-regular`}>
          
          {/* Descrição */}
          <div className="mb-6">
            <p className={`text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2 break-words whitespace-normal ${isMobile ? 'max-h-[80px]' : 'max-h-[80px]'} max-w-[400px] overflow-y-auto `}>{product?.description}</p>
          </div>
          {/* Preço e Botão */}
            <div className="flex gap-[20px] font-Inter-regular">
              <p className="text-3xl   text-gray-600 ">Preço: </p>
              <p className="text-3xl  text-green-600">R${product?.price?.toFixed(2).replace(".", ",")}</p>
            </div>
        </div>
      </div>
    </div>

    )
}