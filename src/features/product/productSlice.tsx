import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

//context com estados relacionados aos produtos
interface Flaver{
    id: string;
    name: string;
    price: number;
    img: string;
    description: string;
    quantidade: number;
}
interface FlaversType{
    type: string;
    flavers: Flaver[];
}

interface FlaversState {
    flaversType: FlaversType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

//funcao que carrega os produtos
//caso nao tenha produtos no local storage, carrega os produtos do json
export const loadInitialData = createAsyncThunk<FlaversType[], void>(
    'product/loadInitialData',
    async (): Promise<FlaversType[]> => {
        try {
            const serializedProducts = localStorage.getItem('products');
            if (serializedProducts) {
                return JSON.parse(serializedProducts);
            }
            const response = await import('../../jsons/Products.json')
            const initialData = response.default;
           
            localStorage.setItem('products', JSON.stringify(initialData));
            return [...initialData];      
        } catch (e) {
            console.warn("failed to load products from local storage", e);
            return [];
        }
    }
);

//estado inicial
const initialState: FlaversState = {
    flaversType: [],
    status: 'idle',
};

//salva os produtos no local storage
const saveProductsToLocalStorage = (flaversType: FlaversType[]) => {
    try{
        const serializedProducts = JSON.stringify(flaversType);
        localStorage.setItem('products', serializedProducts)
    }catch(e){
        console.warn("failed to save products to local storage", e);
    }
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        //adiciona o tipo
        addType:(state, action: PayloadAction<string>) =>{
            state.flaversType.push({type: action.payload, flavers: []});
            saveProductsToLocalStorage(state.flaversType);
        },
        //remove o tipo
        deleteType: (state, action: PayloadAction<string>) => {
            state.flaversType = state.flaversType.filter((p) => p.type !== action.payload);
            saveProductsToLocalStorage(state.flaversType);
        },
        //altera o tipo
        updateType: (state, action: PayloadAction<{type: string, newType: string}>) => {
            const {type, newType} = action.payload;
            const existingType = state.flaversType.find((p) => p.type === type);
            if(existingType){
                existingType.type = newType;
                saveProductsToLocalStorage(state.flaversType);
            }
        },
        //adiciona o produto
        addProduct: (state, action: PayloadAction<{type: string, flaver: Flaver}>) => {
            const {type, flaver} = action.payload;
            const quantidade = Number(flaver.quantidade)
            console.log(quantidade)
            const isFormEmpty = !flaver.name || flaver.price <= 0 || !flaver.description ||!flaver.quantidade ||  quantidade <= 0;  ;
            const existingType = state.flaversType.find((p) => p.type === type);
            if( existingType && !isFormEmpty){
                existingType.flavers = [...existingType.flavers, flaver];
                saveProductsToLocalStorage(state.flaversType);
            }     
        },
        //altera o produto
        updateProduct: (state, action: PayloadAction<{type: string, flaver: Flaver}>) => {
            const {type, flaver} = action.payload;
            const existingType = state.flaversType.find((p) => p.type === type);
            if(existingType){
                const index = existingType?.flavers.findIndex((p) => p.id ===  flaver.id);
                if(index !== -1){
                existingType.flavers[index] = flaver;
                saveProductsToLocalStorage(state.flaversType);
                }
            }
        },
        //remove o produto
        deleteProduct: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            state.flaversType = state.flaversType.map(typeGroup => ({
                ...typeGroup,
                flavers: typeGroup.flavers.filter(f => f.id !== id)
            }));
            saveProductsToLocalStorage(state.flaversType);
        },

        //reduz a quantidade
        reduceQuantity: (state: FlaversState, action: PayloadAction<{id: string, quantity: number}>) => {
            const { id, quantity} = action.payload;
            for(const type of state.flaversType){
                for(const flaver of type.flavers){
                    if(flaver.id === id){
                        flaver.quantidade = (flaver.quantidade|| 0) - quantity;
                        if(flaver.quantidade < 0){
                            flaver.quantidade = 0;
                            
                        }
                        saveProductsToLocalStorage(state.flaversType);
                    }
                }
            }
            
        },
        //aumenta a quantidade
        increaseQuantity: (state: FlaversState, action: PayloadAction<{ id: string, quantity: number}>) => {
            const {id, quantity} = action.payload;
            for(const type of state.flaversType){
                for(const flaver of type.flavers){
                    if(flaver.id === id){
                        flaver.quantidade = (flaver.quantidade || 0) + quantity;
                        saveProductsToLocalStorage(state.flaversType);
                    }
                }
            }
        },
        //altera a quantidade especifica
        addSpecificNumberQuantity: (state: FlaversState, action: PayloadAction<{id: string, quantity: number}>) => {
            const { id, quantity} = action.payload;
            for(const type of state.flaversType){
                for(const flaver of type.flavers){
                    if(flaver.id === id){
                        flaver.quantidade = quantity;
                        saveProductsToLocalStorage(state.flaversType);
                    }
                }
            }
        },
        //altera o preco com um valor especifico
        addSpecificPriceValue: (state: FlaversState, action: PayloadAction<{id: string, price: number}>) => {
            const {id, price} = action.payload;
            for(const type of state.flaversType){
                for(const flaver of type.flavers){
                    if(flaver.id === id){
                        flaver.price = price;
                        saveProductsToLocalStorage(state.flaversType);
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadInitialData.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(loadInitialData.fulfilled, (state, action: PayloadAction<FlaversType[]>) =>{
            state.flaversType = action.payload;
            state.status = 'succeeded';
        })
        .addCase(loadInitialData.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export const {addType, deleteType, updateType, addProduct, deleteProduct, updateProduct, reduceQuantity, increaseQuantity, addSpecificNumberQuantity, addSpecificPriceValue} = productSlice.actions;
export default productSlice.reducer;