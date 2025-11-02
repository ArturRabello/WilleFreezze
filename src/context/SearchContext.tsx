import { createContext, useState, useContext} from "react";

//Context relacionado a pesquisa de produtos

//interface do tipo de dados
interface SearchContextType {
  modalProductViewOpen: () => void;
  modalProductViewClose: () => void;
  selectProduct: (id: string | null) => void;
  selectedProductId: string | null;
  modalProductView: boolean;
  selectedType: (type: string) => void;
  type: string;
}

// função que verifica se o context foi criado, se sim o retorna
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearchContext must be used within a SearchProvider");
  return context;
};

// criando o context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Componente composto por funções context
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    //productsController
    const [modalProductView, setModalProductView] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [type, setType] = useState('');

    // funções que seleciona o tipo de produto
    const selectedType = (type: string) => {
        setType(type);
    }
    // funções que abre e fecha o modal
    const modalProductViewOpen = () => {
        setModalProductView(true);
    }
    // funções que abre e fecha o modal
    const modalProductViewClose = () => {
        setModalProductView(false);
        setSelectedProductId(null);
    }

    // funções que seleciona o produto
    const selectProduct = (id: string | null) => {
        setSelectedProductId(id);
    }

    return (
        <SearchContext.Provider
            value={{
                modalProductView,
                selectProduct,
                modalProductViewOpen,
                modalProductViewClose,
                selectedProductId,
                selectedType,
                type
                
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}