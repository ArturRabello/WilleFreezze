import {List} from "@mui/material"
import type { RootState } from "../../../app/store";
import { shallowEqual, useSelector } from "react-redux";
import { useContext } from "react";
import { LayoutContext } from "../../../context/LayoutContext";
import {User} from './User';
import React from "react";

// Componente lista de usuários
interface User {
    id: string;
    fullName: string;
    email: string;
    cpf: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
    role: string;
}

function UserList({handlerRemoveUser, handlerChangeStatus}:
        ({handlerRemoveUser: (Id: string) => void, handlerChangeStatus: (Id: string, role: string) => void, filteredUsers?: User[]}))
             {
            
    const Users = useSelector((state: RootState) => state.auth.users, shallowEqual);
    const {isMobile} = useContext(LayoutContext);

    return(
        <>
        <List className={`h-[500px] overflow-y-auto scrollbar-custom  ${isMobile ? 'w-[300px]' : 'w-[400px]'}`}>
            <>
            {/* percorre a lista de usuários */}
            {Users.map((user) => (
                    <User key={user.id} user={user} handlerRemoveUser={handlerRemoveUser} handlerChangeStatus={handlerChangeStatus}/>
                ))}
            </>
            </List>
        </>
    )
}

function areEqual(prevProps: {filteredUsers?: User[]}, nextProps: {filteredUsers?: User[]}) {
    return prevProps.filteredUsers === nextProps.filteredUsers;
}


export default React.memo(UserList, areEqual);