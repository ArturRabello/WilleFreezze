import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
//context com estados relacionados a compras

interface Products {
    id: string,
    name: string,
    price: number,
    img: string,
    description: string,
    quantityBasket: number
    qntTotal: number
}

interface Purchases {
    userId: string,
    products: Products[],
    total: number
}
interface PurchaseState {
    purchase: Purchases[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}


// sava os dados no local storage
const savePurchaseToLocalStorage = (Purcheses: Purchases[]) => {
    try {
        const serializerdProducts = JSON.stringify(Purcheses);
        localStorage.setItem('purchases', serializerdProducts);
    } catch (e) {
        console.warn("failed to save basket to local storage", e);
    }
}

// estado inicial 
const initialState: PurchaseState = {
    purchase: JSON.parse(localStorage.getItem('purchases') || '[]'),
    status: 'idle',
}

const userPurchasesSlice = createSlice({
    name: "userPurchases",
    initialState,
    reducers: {
        //cria uma nova lista de compra
        createPurchase: (state, action: PayloadAction<{ userId: string }>) => {
            if (action.payload.userId !== '') {
                state.purchase.push({ userId: action.payload.userId, products: [], total: 0 });
                savePurchaseToLocalStorage(state.purchase);
            }
        },
        //adiciona o produto a lista de compra 
        //verifica se o produto ja existe na lista de compra caso exista ele adiciona a quantidade e atualiza o total
        addProductPurchase: (state, action: PayloadAction<{ userId: string | undefined, product: Products }>) => {
            const userPurchases = state.purchase.find((purchase) => purchase.userId === action.payload.userId);
            if (userPurchases) {
                const existingProduct = userPurchases.products.find((product) => product.id === action.payload.product.id);
                if (existingProduct) {
                    existingProduct.quantityBasket += action.payload.product.quantityBasket;
                    existingProduct.qntTotal += action.payload.product.qntTotal
                    userPurchases.total += (action.payload.product.price * action.payload.product.quantityBasket);
                    savePurchaseToLocalStorage(state.purchase);
                    return;
                } else {
                    userPurchases.products.push({ ...action.payload.product, quantityBasket: action.payload.product.quantityBasket, price: action.payload.product.price });
                }
                userPurchases.total += action.payload.product.price;
                savePurchaseToLocalStorage(state.purchase);
            }
        },
        //remove o produto da lista de compra
        removeProductPurchase: (state, action: PayloadAction<{ userId: string, id: string }>) => {
            const userPurchases = state.purchase.find((purchase) => purchase.userId === action.payload.userId);
            if (userPurchases) {
                userPurchases.products = userPurchases.products.filter((product) => product.id !== action.payload.id);
                userPurchases.total -= userPurchases.total;
                savePurchaseToLocalStorage(state.purchase);
            }
        },
    }
});

export const { createPurchase, addProductPurchase, removeProductPurchase } = userPurchasesSlice.actions;
export default userPurchasesSlice.reducer;