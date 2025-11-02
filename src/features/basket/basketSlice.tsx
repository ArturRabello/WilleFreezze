import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


// context com estados relacionados ao carrinho

//interfaces dos dados
interface Products {
    id: string,
    name: string,
    price: number,
    img?: string,
    description: string,
    quantityBasket: number
    qntTotal: number
}

interface Basket {
    userId: string,
    products: Products[],
    total: number
}
interface BasketState {
    basket: Basket[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

//estado inicial
const initialState: BasketState = {
    basket: JSON.parse(localStorage.getItem('basket') || '[]'),
    status: 'idle',
}

//procura o carinho do usuario
const findUserBasket = (state: BasketState, userId: string) =>
    state.basket.find((basket) => basket.userId === userId);

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        //cria o carrinho
        createBasket: (state, action: PayloadAction<{ userId: string }>) => {
            if( action.payload.userId !== ''){
                state.basket.push({ userId: action.payload.userId, products: [], total: 0 });
            }         
        },
        //adiciona o produto ao carrinho
        addProductBasket: (state, action: PayloadAction<{ userId: string, product: Products }>) => {
            const userBasket = findUserBasket(state, action.payload.userId);
            if (userBasket) {
                const existingProduct = userBasket.products.find((product) => product.id === action.payload.product.id);
                if (existingProduct) {
                    existingProduct.quantityBasket += 1;
                    existingProduct.qntTotal = Number((existingProduct.qntTotal + existingProduct.price).toFixed(2));
                    userBasket.total = Number((userBasket.total + existingProduct.price).toFixed(2));
                    return;
                } else {
                    
                    const { img, ...productSemImagem } = action.payload.product;
            
                    userBasket.products.push({
                        ...productSemImagem,
                        quantityBasket: 1,
                        qntTotal: action.payload.product.price
                    });
                }
                userBasket.total += action.payload.product.price;
            }
        },
        //remove o produto do carrinho
        removeProductBasket: (state, action: PayloadAction<{ userId: string, id: string }>) => {
            const userBasket = findUserBasket(state, action.payload.userId);
            if (userBasket) {
                userBasket.products = userBasket.products.filter((products) => products.id !== action.payload.id);
            }
        },
        // adiciona a quantidade
        addQuantity: (state, action: PayloadAction<{ userId: string, id: string }>) => {
            const userBasket = findUserBasket(state, action.payload.userId);
            if (userBasket) {
                const product = userBasket.products.find((product) => product.id === action.payload.id);
                if (product) {
                    product.quantityBasket += 1;
                    userBasket.total = Number((userBasket.total + product.price).toFixed(2));
                    product.qntTotal = Number((product.qntTotal + product.price).toFixed(2));
                }
            }
        },
        // remove a quantidade de produto
        removeQuantity: (state, action: PayloadAction<{ userId: string, id: string }>) => {
            const userBasket = findUserBasket(state, action.payload.userId);
            if (userBasket) {
                const product = userBasket.products.find((product) => product.id === action.payload.id);
                if (product) {
                    product.quantityBasket -= 1;
                    userBasket.total = Number((userBasket.total - product.price).toFixed(2));
                    product.qntTotal = Number((product.qntTotal - product.price).toFixed(2));

                    if (product.quantityBasket <= 0) {
                        userBasket.products = userBasket.products.filter((products) => products.id !== action.payload.id);
                    }
                }
            }
        },
        // limpa o carrinho
        resetBasket: (state, action: PayloadAction<{ userId: string }>) => {
            const userBasket = findUserBasket(state, action.payload.userId);

            if (userBasket) {
                userBasket.total = 0;
                userBasket.products = [];
            } else {
                console.warn("No user basket found");
            }
        },
    }
});

export const { createBasket, addProductBasket, removeProductBasket, addQuantity, removeQuantity, resetBasket } = basketSlice.actions;
export default basketSlice.reducer;