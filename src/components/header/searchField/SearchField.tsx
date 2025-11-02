
import { useState, useEffect, useRef} from 'react';
import lupa from '../../../assets/lupa.png';
import DropDownSearch from './dropDownSearch/DropDownSearch.tsx';
import type { RootState } from '../../../app/store.tsx';
import { useSelector } from 'react-redux';

// Campo de busca 
function SearchField({ isDesktop, isTablet }: any) {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');
    const [block, setBlock] = useState(true);

    const ref = useRef<HTMLDivElement>(null);
    const role = useSelector((state: RootState) => state.auth.sessionUser.currentUser?.role);

    // fecha a barra de pesquisa quando o usuario clicar fora
    // desabilita o campo se block for true
    //sempre que o estado block é alterado o efeito é executado
    useEffect(() => {
        if (!ref.current) return;

        if (block) {
            ref.current.style.pointerEvents = 'none';
            ref.current.style.opacity = '0.5';
        } else {
            ref.current.style.pointerEvents = 'auto';
            ref.current.style.opacity = '1';
        }
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [block]);

    // Em determinadas rotas a barra de pesquisa deve ser bloqueada
    // o efeito é executado quando a rota ou o role do user mudar
    useEffect(() => {
        const path = location.pathname;

        if (path.includes("/ProductController") || path.includes("/UsersController")) {
            console.log("Liberando a barra de pesquisa");
            setBlock(false); // libera a barra
        } else if (path === "/" && role === 'user') {
            console.log("Liberando a barra de pesquisa");
            setBlock(false); // libera a barra para home quando user = 'user'
        } else {
            console.log("Bloqueando a barra de pesquisa");
            setBlock(true); // bloqueia em todas as outras rotas
        }
    }, [location.pathname, role]);

    return (<div ref={ref} className={` ${isDesktop ? 'w-[526px] h-[45px]' : isTablet ? 'w-[340px] h-[45px]' : 'w-[216px] h-[45px]'} ${isDesktop ? 'w-[526px] h-[45px]' : isTablet ? 'w-[340px] h-[45px]' : 'w-[40px] h-[45px]'} flex items-center  drop-shadow-lg  justify-between bg-[white] rounded-[12px] `}>
        <span className={` flex items-center ${isDesktop ? 'h-[45px]' : 'h-[56px]'}`}>
            <img src={lupa} alt="Pesquisa" />
        </span >
        <input onFocus={() => setIsFocused(true)} value={search} onChange={(e) => setSearch(e.target.value)} className={` ${isDesktop ? 'w-[526px] h-[45px]' : isTablet ? 'w-[340px] h-[45px]' : 'w-[210px] h-[45px]'} focus:outline-none rounded-[12px]`} >
        </input>
        {/*Se isFocused for true, o DropDownSearch será renderizado*/}
        {isFocused && <DropDownSearch search={search} />}
    </div>
    );
}

export default SearchField;