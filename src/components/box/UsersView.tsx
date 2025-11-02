
import { useContext } from "react";
import {removeUser, updateRole}  from "../../features/auth/authSlice";
import { useDispatch} from "react-redux";
import type { AppDispatch} from "../../app/store";
import { LayoutContext } from "../../context/LayoutContext";
import UserList from "../list/users/UserList";

// Componente de visualização de usuários

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

function UsersView({filteredUsers}: {filteredUsers?: User[]}) {

    const { isTablet, isMobile} = useContext(LayoutContext);
    const dispatch = useDispatch<AppDispatch>();
    
    // remover um usuario
    const handlerRemoveUser = (Id: string) => {
        dispatch(removeUser({Id}));
    }
    // alterar o papel do user
    const handlerChangeStatus = (Id: string, role: string) => {
        dispatch(updateRole({Id, role}));
    }
    
    return (
        <div className={`flex flex-col items-center pb-[50px] h-[500px] gap-y-[20px]  ${isMobile || isTablet ? 'pt-[50px]' : 'pt-[50px]'}`}>
            {!filteredUsers && <h1 className="text-[32px] font-Poppins-bold">Usuarios</h1>}
            <UserList handlerRemoveUser={handlerRemoveUser} handlerChangeStatus={handlerChangeStatus}/>
        </div>
    );
}

export default UsersView;