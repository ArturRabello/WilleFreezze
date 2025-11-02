import BaseBoard from "../components/baseBoard/BaseBoard"
import Header from "../components/header/Header"
import BoxBasket from "../components/box/boxBasket/BoxBasket"

function BasketPage() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Header />
            <BoxBasket/>
            <BaseBoard />
        </div>
    )
}

export default BasketPage