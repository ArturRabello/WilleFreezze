import Header from "../components/header/Header"
import Baseboard from "../components/baseBoard/BaseBoard"
import BoxPurchases from "../components/box/BoxPurchases"

function MyPurchases() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Header/>
            <BoxPurchases/>
            <Baseboard/>
        </div>
    )
}

export default MyPurchases