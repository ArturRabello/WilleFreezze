import { List } from "@mui/material"
import React, { useContext} from "react"
import { LayoutContext } from "../../../context/LayoutContext";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { CurrentType } from "./currentType/CurrentType";
import { FilteredProductsList } from "./filteredProductList/FilteredProductList";
import { useImage } from "../../../context/image/ImageContext";


interface Flaver {
    id: string;
    name: string;
    price: number;
    img: string;
    description: string;
    quantidade: number;
}

interface FlaversType {
    type: string;
    flavers: Flaver[];
}


function ProductList({type, selectedType, modalProductViewOpen, selectProduct, }: 
        {type: string; selectedType: (type: string) => void; modalProductViewOpen: () => void; selectProduct: (id: string | null) => void}) {

    const { isDesktop, isTablet } = useContext(LayoutContext);
    const { imagesDone } = useImage();
    console.log(imagesDone);

    const produtos = useSelector((state: RootState) => state.product.flaversType);

    const containerWidth = isDesktop ? 
        'w-[650px]' : isTablet ? 'w-[325px]' : 'w-[280px]';

    const listWidth = isDesktop || isTablet ? '' : 'w-[310px]';

    return (
        <div className={`flex flex-col gap-y-[20px] items-center ${containerWidth}`}>
            <List
                className={`flex flex-col items-center gap-y-[15px] ${type ? 'h-[420px]' : ''} ${listWidth} overflow-y-auto overflow-x-hidden scrollbar-custom`}
            >
                {/* Caso type nao selecionado: passa o tipo de todos os tipos */}
                {type === '' &&
                    produtos.map((produto: FlaversType, index: number) => (
                        <CurrentType key={index} produtos={produto} index={index} selectedType={selectedType} />
                    ))}

                {/* Caso type selecionado: mostra produtos selecionados presente naquele tipo */}
                {type &&
                    produtos
                        .find((item: FlaversType) => item.type === type)
                        ?.flavers.map((produto: Flaver) => (
                            <FilteredProductsList key={produto.id} produtos={produto}  modalProductViewOpen={modalProductViewOpen} selectProduct={selectProduct} img={imagesDone[produto.id]} />
                    ))}
            </List>
        </div>
    );
}


export default React.memo(ProductList);