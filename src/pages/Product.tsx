import Header from "../components/Header"
import BoxProduto from "../components/BoxProduto"
import Footer from "../components/BaseBoard"

function Product({isDesktop, isTablet, isMobile}: any) {
    return (
        <div className="flex flex-col justify-between  h-screen">
            <Header isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile}/>
            <BoxProduto isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile}/>
            <Footer isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile}/>
        </div>
    )
}

export default Product