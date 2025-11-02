import Header from "../components/header/Header"
import BoxProduto from "../components/box/BoxProduto"
import Footer from "../components/baseBoard/BaseBoard"

function Product() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Header />
            <BoxProduto />
            <Footer />
        </div>
    )
}

export default Product