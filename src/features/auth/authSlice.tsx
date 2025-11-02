import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import UsersData from '../../jsons/Users.json';
import { createBasket } from "../basket/basketSlice";
import { createPurchase } from "../userPurchases/userPurchasesSlice";

// context com estados relacionados a autentificação

//interfaces dos dados 
interface User {
    id: string;
    fullName: string;
    email: string;
    cpf: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
    role: string
}

interface sessionUser {
     currentUser: User | null;
     isLogged: boolean
}

interface AuthState {
    users: User[];
    error: String | null;
    sessionUser: sessionUser;
}

// carregamento de dados iniciais
const loadInitialData = () => {
    const serializedUsers = localStorage.getItem("users");

    if (serializedUsers) {
        return JSON.parse(serializedUsers);
    }

    const users = [...UsersData.users];
    localStorage.setItem("users", JSON.stringify(users));
    return users;
};

// estado inicial
const initialState: AuthState = {
    users: loadInitialData() || [],
    error: null,
    sessionUser: {
        currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
        isLogged: JSON.parse(localStorage.getItem("isLogged") || "false")
    }
    
};

// função de validação de CPF
const validarCpf = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;

    // Primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    // Segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

// função de validação de email
const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const dominiosPermitidos = /(gmail|hotmail|yahoo|outlook|live|protonmail)/i;

    const contemUnderScore = /(_|.)/i;

    const terminaCom = /\.com$/i;

    return(
        regex.test(email)
        && dominiosPermitidos.test(email)
        && contemUnderScore.test(email)
        && terminaCom.test(email)
    )
}

//função de validação da data de nascimento
const validarBearthDay = (date: string) => {
    const birthDate = new Date(date);

    if (isNaN(birthDate.getTime())) return false;
        
    const today = new Date();

    if(birthDate > today) return false;


    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if(age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        return false;
    }

    return true;
}

//funcao de limpar o erro
const clearError = (state: AuthState) => state.error = null;

//funcão de cadastro
export const RegisterUser = createAsyncThunk<User, User, { rejectValue: string }>(
    "auth/register", async (userData, {rejectWithValue, getState, dispatch}) => {
        try{
            if(!userData.fullName || !userData.email || !userData.cpf || !userData.dateOfBirth || !userData.password || !userData.confirmPassword){
                return rejectWithValue("Todos os campos devem estar preenchidos");
            }

            //verificacoes de dados
            if(userData.password !== userData.confirmPassword) return rejectWithValue("As senhas não coincidem");
            if(userData.password.length < 8) return rejectWithValue("A senha deve ter no mínimo 8 caracteres");
            if(userData.fullName === typeof Number) return rejectWithValue("O nome nao deve apresentar numeros");
            if(userData.cpf.length < 11) return rejectWithValue("Um CPF deve ter 11 digitos");
            if(!validarCpf(userData.cpf)) return rejectWithValue("CPF inválido");
            if(!validarEmail(userData.email)) return rejectWithValue("Email inválido");
            if(!validarBearthDay(userData.dateOfBirth)) return rejectWithValue("O usuário deve ser maior de 18 anos");
    
            //verificações de existencia dos dados
            const state = getState() as { auth: AuthState };
            if(state.auth.users.some(u => u.email === userData.email)) return rejectWithValue("Email já cadastrado");
            if(state.auth.users.some(u => u.cpf === userData.cpf)) return rejectWithValue("CPF já cadastrado");
            
            //cadastro
            const newUser = { ...userData, id: crypto.randomUUID(), role: "user" };
            const updateUsers = [...state.auth.users, newUser];

            //salvando os dados no local storage
            localStorage.setItem("users", JSON.stringify(updateUsers));
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            localStorage.setItem("isLogged", JSON.stringify(true));

            //criando a cesta e a compras
            dispatch(createBasket({ userId: newUser.id }));
            dispatch(createPurchase({ userId: newUser.id }));

            return newUser;

        }catch(err){
            return rejectWithValue((err as Error).message || "Erro ao cadastrar usuário");
        }

    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        //login do usuario
        login(state, action: PayloadAction<User>){
            clearError(state);
            const user = state.users.find(
                (user) => user.email === action.payload.email && user.password === action.payload.password
            );

            if(!user){
                state.error = "Email ou senha inválidos";
            }else{ 
                state.sessionUser.currentUser = user;
                state.sessionUser.isLogged = true;
            }
        },
        //remover um usuario
        removeUser(state, action: PayloadAction<{Id: string}>){
            const Id = action.payload.Id;
            const userId = state.users.find((user) => user.id === Id)
            if(userId){
                const newUsers = state.users.filter((user) => user.id !== Id);
                state.users = newUsers;
            }
        },
        //alterar o papel do usuario
        //user ou admin
        updateRole(state, action: PayloadAction<{Id: String, role: string}>){
            const {Id, role} = action.payload;
            const user = state.users.find((user) => user.id === Id);
            if(user){
                if(user.role !== role){
                    user.role = role;
                }
            }
        },
        //logout
        islogout(state){
            state.sessionUser.isLogged = false;
            state.sessionUser.currentUser = null;
        },
        //limpar o erro
        ClearError(state){
            clearError(state);
        }

    },
    extraReducers: (builder) => {
        builder.addCase(RegisterUser.pending, (state) => {
            state.error = null;
        });
        builder.addCase(RegisterUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
            state.sessionUser.currentUser = action.payload;
            state.sessionUser.isLogged = true;
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    }
});

export const {login, islogout, removeUser, ClearError, updateRole } = authSlice.actions;
export default authSlice.reducer;