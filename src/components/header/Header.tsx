
import Basket from '../header/headerIcons/Basket.tsx'
import MainIcon from '../baseBoard/MainIcon/MainIcon.tsx';
import SearchField from './searchField/SearchField.tsx';
import MenuTablet from './Menu/MenuTablet.tsx';
import Avatar from './headerIcons/avatar/Avatar.tsx';
import { LayoutContext } from '../../context/LayoutContext.tsx';
import { useContext } from 'react';

//Component Header
function Header() {
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);
    //composto por icone, busca e carrinho
    return (
        <header className={`relative w-full z-10 drop-shadow-lg ${isDesktop ? 'flex items-center justify-evenly h-[120px] bg-[#0097C4] px-[30px]' : 'sticky top-0 flex  z-3 items-center gap-x-5 justify-between h-[130px] w-full bg-[#0097C4] px-[30px]'}`}>
            {(isDesktop || isTablet) && <MainIcon />}
            <SearchField isDesktop={isDesktop} isTablet={isTablet} />
            {isDesktop &&
                <section className={'flex pr-[20px] gap-x-10'}>
                    <Avatar/>
                    <Basket />
                </section>
            }
            {(isTablet || isMobile) && <MenuTablet isTablet={isTablet}  />}

        </header>
    )
}

export default Header;