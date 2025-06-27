
import Basket from './headerIcons/Basket.tsx';
import MainIcon from './MainIcon.tsx';
import SearchField from './SearchField.tsx';
import MenuTablet from './MenuTablet.tsx';
import Avatar from './headerIcons/Avatar.tsx';
import { LayoutContext } from '../context/LayoutContext.tsx';
import { useContext } from 'react';
function Header() {

    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);

    return (
        <header className={` shadow-lg ${isDesktop ? 'flex items-center justify-evenly h-[120px] bg-[#0097C4] px-[30px]' : 'flex fixed z-3 items-center gap-x-5 justify-between h-[130px] w-full bg-[#0097C4] px-[30px]'}`}>
            {(isDesktop || isTablet) && <MainIcon />}
            <SearchField isDesktop={isDesktop} isTablet={isTablet} />
            {isDesktop &&
                <section className={'flex pr-[20px] gap-x-10'}>
                    <Avatar/>
                    <Basket />
                </section>
            }
            {(isTablet || isMobile) && <MenuTablet isTablet={isTablet} />}

        </header>
    )
}

export default Header;