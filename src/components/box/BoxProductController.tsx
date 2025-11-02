
import {  useContext, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import ModalUploadImage from "../modal/ModalUploadImage";
import ProductList from "../list/ProductList/ProductList";
import { FormCreateProduct } from "../forms/FormCreateProduct";
import { ModalProductView } from "../modal/ModalProductView";
import {useSearchContext} from '../../context/SearchContext';

// Componente composto por funções de criação e manipulação de produtos
function BoxProductController() {
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    const { modalProductViewOpen, modalProductViewClose, modalProductView, selectedProductId, selectProduct, type, selectedType} = useSearchContext();
    const [modalUploadImage, setModalUploadImage] = useState(false);
    const [Images, setImages] = useState<string[]>([]);
    
    return (
        <div className={`${isDesktop ? 'w-[1122px] h-[588px]' : isTablet ? 'w-[700px]' : 'w-[320px] '} rounded-[12px] `}>
            {/* Modal de upload de imagens */}
            {modalUploadImage && (
                <ModalUploadImage setModalUploadImage={setModalUploadImage} setImages={setImages} images={Images}/>
            )}
            {/* Modal de visualização das informações do produto */}
            {modalProductView && (
                <ModalProductView  modalProductViewClose={modalProductViewClose} selectedProductId={selectedProductId}/>
            )}
            {/* Cabeçalho, exibe o tipo do produto */}
            <div className={`flex items-center ${isMobile && 'flex-col'}`}>
                <h1 className="text-[32px] font-bold pl-[40px] pt-[20px] pb-[20px] font-Inter-regular"  onClick={() => selectedType('') }>Produtos Cadastrados</h1>
                <h1 className="text-[32px] pl-[12px] pt-[20px] pb-[20px] font-Inter-regular">{(type === '' || isMobile) ? '' : '>' }{type}</h1>
            </div>
            <div className={`flex ${(isMobile || isTablet) && 'flex-col items-center'} justify-center gap-y-[20px]`}>
                {/* Lista de produtos */}
                <ProductList type={type} selectedType={selectedType}  modalProductViewOpen={modalProductViewOpen} selectProduct={selectProduct}/>
                      {!isDesktop && <h1 className="text-[36px] font-bold py-[40px] text-center">Cadastrar Produto</h1>}
                {/* Formulario de cadastro de produtos */}
                <FormCreateProduct type={type} setModalOpen={setModalUploadImage} setImages={setImages} Images={Images} />
            </div>
        </div>
    );
}

export default BoxProductController;