import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Flaver{
    id: number;
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
    flaversType: FlaversType[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const loadInitialData = createAsyncThunk<FlaversType[], void>(
    'product/loadInitialData',
    async (): Promise<FlaversType[]> =>{
        try{
        const serializedProducts = localStorage.getItem('products');
        if(serializedProducts){
            return JSON.parse(serializedProducts);
        }

        const response = await import ('../../jsons/Products.json')
        const initialData = response.default;

        localStorage.setItem('products', JSON.stringify(initialData));
        return initialData;
       
    }catch(e){
        console.warn("failed to load products from local storage", e);
        return [];
    }
    }
);

const initialState: FlaversState = {
    flaversType: [],
    status: 'idle',
};


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
        addType:(state, action: PayloadAction<string>) =>{
            state.flaversType.push({type: action.payload, flavers: []});
            saveProductsToLocalStorage(state.flaversType);
            
        },
        deleteType: (state, action: PayloadAction<string>) => {
            state.flaversType = state.flaversType.filter((p) => p.type !== action.payload);
            saveProductsToLocalStorage(state.flaversType);
        },
        updateType: (state, action: PayloadAction<{type: string, newType: string}>) => {
            const {type, newType} = action.payload;
            const existingType = state.flaversType.find((p) => p.type === type);

            if(existingType){
                existingType.type = newType;
                saveProductsToLocalStorage(state.flaversType);
            }
        },
        addProduct: (state, action: PayloadAction<{type: string, flaver: Flaver}>) => {
            const {type, flaver} = action.payload;
            const existingType = state.flaversType.find((p) => p.type === type);

            if( existingType){
                existingType.flavers.push(flaver);
                saveProductsToLocalStorage(state.flaversType);
            }     
        },
        removeProduct: (state, action: PayloadAction<{type: string, id: number}>) =>{
                const {type, id} = action.payload;
                const existingType = state.flaversType.find((p) => p.type === type);

                if(existingType){
                    existingType.flavers = existingType.flavers.filter((f) => f.id !== id);
                    saveProductsToLocalStorage(state.flaversType);
                }
        },
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

export const {addType, deleteType, updateType, addProduct, removeProduct, updateProduct} = productSlice.actions;
export default productSlice.reducer;