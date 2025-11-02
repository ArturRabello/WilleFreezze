
import PurchasesItemList from "../list/PurchasesItemList";

function BoxPurchases(){
    return(
        <div className={`flex items-center justify-center`}>
            <div className="flex flex-col items-center justify-center w-[956px] h-[524px] ">
                <div className="flex p-[10px] text-[32px] font-bold ">
                    <p>Meu pedidos</p>
                </div>
                <PurchasesItemList />
            </div>
        </div>
    )
}

export default BoxPurchases;