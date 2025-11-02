
import { useMemo,  useContext} from "react";
import { useLocation } from "react-router";
import { type AppDispatch, type RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useSearchContext} from "../../../../context/SearchContext";

import { LayoutContext } from "../../../../context/LayoutContext";
import { FilteredProductsList } from "../../../list/ProductList/filteredProductList/FilteredProductList";
import {ProductHome} from "../../../list/productHomeSearch/ProductHome";
import { User } from "../../../list/users/User";
import { removeUser, updateRole } from "../../../../features/auth/authSlice";
import { useImage } from "../../../../context/image/ImageContext";

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

interface User {
    id: string;
    fullName: string;
    email: string;
    cpf: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
    role: string;
}

//dropdown de pesquisa, mostra os resultados da pesquisa
function DropDownSearch({search}: {search: string}) {

    const location = useLocation();
    const {isDesktop, isTablet} = useContext(LayoutContext);
    const { modalProductViewOpen, selectProduct } = useSearchContext();

    const products = useSelector((state: RootState) => state.product.flaversType);
    const users = useSelector((state: RootState) => state.auth.users);

    const dispatch = useDispatch<AppDispatch>();
    const {imagesDone} = useImage();
    
    // remover um usuario
    const handlerRemoveUser = (Id: string) => {
        dispatch(removeUser({Id}));
    }

    // alterar o papel do user
    const handlerChangeStatus = (Id: string, role: string) => {
        dispatch(updateRole({Id, role}));
    }

    // busca os produtos
    const queryProducts = () => {
        if (!search.trim()) return [];
        return products
        // monta uma lista com todos os produtos, ignorando os tipos
        //Ordena os resultados por ordem alfabetica
        .flatMap((flaversType: FlaversType) =>
            flaversType.flavers.filter((flaver: Flaver) => flaver.name.toLowerCase().includes(search.toLowerCase())))
            .sort((a, b) => {
                const aComeca = a.name.toLowerCase().startsWith(search.toLowerCase()); 
                const bComeca = b.name.toLowerCase().startsWith(search.toLowerCase());
                return Number(bComeca) - Number(aComeca);
            })
    };

    // busca os usuarios
    const queryUsers = useMemo(() => {
        if (!search.trim()) return [];
        //Ordena os resultados por ordem alfabetica
        return users.filter((user: User) =>
            user.fullName.toLowerCase().includes(search.toLocaleLowerCase()) && user)
               .sort((a, b) => {
                const aComeca = a.fullName.toLowerCase().startsWith(search.toLowerCase()); 
                const bComeca = b.fullName.toLowerCase().startsWith(search.toLowerCase());
                return Number(bComeca) - Number(aComeca);
               });
    }, [search, users]);


    return (<div className={`absolute z-2 flex  flex-col items-center  ${isDesktop ? 'w-[526px]' : isTablet ? 'w-[340px]' : 'w-[210px]'} max-h-[400px] top-[65px] bg-[white] rounded-[12px] shadow-2xl scrollbar-custom `} >
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        {/* se a rota for "/ProductController" exibe os produtos filtrados*/}
        {
            location.pathname === '/ProductController' && 
                queryProducts().map((produto: Flaver) => 
                    <FilteredProductsList key={produto.id} produtos={produto}
                         modalProductViewOpen={modalProductViewOpen} selectProduct={selectProduct} img={imagesDone[produto.id]} isSearch/>
            )
        }
        {/* se a rota for "/UsersController" exibe os usuarios filtrados*/}
        {
            location.pathname === '/UsersController' &&
                queryUsers.map((user: User) =>
                    <User key={user.id} user={user} handlerRemoveUser={handlerRemoveUser} handlerChangeStatus={handlerChangeStatus} isSearch/>
            )
        }
        {/* se a rota for "/" exibe os produtos filtrados*/}
        {
            location.pathname === '/' &&
                queryProducts().map((produto: Flaver) =>
                    <ProductHome key={produto.id} Product={produto}/>)
        }   
        </div>
    </div>)
}

export default DropDownSearch;
