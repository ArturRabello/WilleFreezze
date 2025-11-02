import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

// redux relacionado a pesquisa
interface SearchState {
    query: string;
    results: string[];
}

// estado inicial
const initialState: SearchState = {
    query: '',
    results: [],
};

const searchSlice = createSlice( {
    name: 'search',
    initialState,
    reducers: {
        // busca no localStorage e retorna os resultados com base na query e no campo
        setQuery: (state, action: PayloadAction<{query: string, localStorageKey: string, nestedKey: string, field: string}>) => {
            const {query, localStorageKey, nestedKey, field} = action.payload;
            state.query = query;

            const localData = localStorage.getItem(localStorageKey);

            if(!localData){
                state.results = [];
                return;
            }

            const data: Array<Record<string, unknown>> = JSON.parse(localData);

            const items: Array<Record<string, unknown>> = nestedKey
                ? data.flatMap(item =>  {
                    const nestedValue = item[nestedKey];
                    return Array.isArray(nestedValue) ? nestedValue : [];
                })
                : data;
        
            state.results = items.filter(item => {
                const value = item[field];
                return typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase());
            }).map(item => item[field] as string);
            
        },
        clearResults: (state) => {
            state.query = '';
            state.results = [];
        }
    }
}) 

export const {setQuery, clearResults} = searchSlice.actions;
export default searchSlice.reducer;