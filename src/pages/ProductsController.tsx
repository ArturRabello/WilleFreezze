import BaseBoard from "../components/baseBoard/BaseBoard"
import Header from "../components/header/Header"
import BoxProductController from "../components/box/BoxProductController"

//Pagina de controle de produtos
function productsController() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Header/>
            <div className="flex items-center justify-center py-[20px]">
                <BoxProductController />
            </div>
            <BaseBoard />
        </div>
    )
}

export default productsController