import { Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LayoutContext } from "../../../context/LayoutContext";
import avatar from "../../../assets/avatar.svg"
import remove from "../../../assets/Icon-exit.svg"
import { useContext } from "react";

// Componente de usuário

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

export function User( {user, handlerRemoveUser, handlerChangeStatus, isSearch = false}: {user: User, handlerRemoveUser: (Id: string) => void, handlerChangeStatus: (Id: string, role: string) => void, isSearch?: boolean}) {
    const { isDesktop, isTablet, isMobile } = useContext(LayoutContext);

    // presets de largura de acordo com o tamanho da tela
    function getUsetWidth(isDesktop: boolean, isTablet: boolean, isMobile: boolean, isSearch: boolean) {
        if (isDesktop && isSearch) return '400px';
        if (isTablet && isSearch) return '310px';
        if (isMobile && isSearch) return '180px';
        if (isMobile) return '300px';
    }

    function getDeviderWidth(isDesktop: boolean, isTablet: boolean, isMobile: boolean, isSearch: boolean) {
        if(isDesktop && isSearch) return'400px';
        if(isTablet && isSearch) return'310px';
        if(isMobile && isSearch) return'180px';
        if (isDesktop || isTablet) return '400px';
        if(isMobile) return'300px'; 
    }

    function getNameUserWidth(isDesktop: boolean, isTablet: boolean, isMobile: boolean, isSearch: boolean) {
        if(isDesktop && isSearch) return '100px';
        if(isTablet && isSearch) return '30px';
        if(isMobile && isSearch) return '5px';
        if (isDesktop || isTablet) return '100px';
        if(isMobile) return'20px';
    }

    return(
        <div key={user.id} className="flex flex-col justify-center items-center font-Inter-regular">
            {/* dados do usuario */}
            <ListItem sx={{ width: getUsetWidth(isDesktop, isTablet, isMobile, isSearch), height: '64px'} }>
                <ListItemAvatar>
                    {/* icone de avatar */}
                    <img src={avatar} alt="Avatar"></img>
                </ListItemAvatar>
                {/* nome do usuario */}
                <ListItemText
                    primary={user.fullName}
                    sx={{
                        paddingLeft: (!isSearch || isMobile) ? '0px' : '10px',
                        marginRight: getNameUserWidth(isDesktop, isTablet, isMobile, isSearch),
                        maxWidth: '100px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',

                    }}
                    slotProps={{
                        primary: {
                            sx: {
                                fontFamily: 'Inter, sans-serif', // ou 'font-Inter-regular' se estiver definido no tailwind
                                fontWeight: 400, // opcional
                                fontSize: '16px', // opcional
                            },
                        }
                    }}
                />
                {/* alterar status */}
                {!(isSearch && isMobile) && <ListItemText primary={
                    <span
                        onClick={() =>
                            handlerChangeStatus(
                                user.id,
                                user.role === 'admin' ? 'user' : 'admin'
                            )
                        }
                        className="cursor-pointer text-[16px]  font-Inter-regular transition-colors duration-300 hover:text-[#0097C4]"
                    >
                        {user.role}
                    </span>
                } />}
                {/* remover usuario */}
                <img src={remove} alt="Remove" onClick={() => handlerRemoveUser(user.id)} className="w-[26px] h-[26px] duration-300 drop-shadow-lg hover:scale-110"></img>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ backgroundColor: '#0097C4', width: getDeviderWidth(isDesktop, isTablet, isMobile, isSearch), height: '2px', listStyle: 'none',  my: isSearch ? '5px' : '2px'}} />
        </div>
    ) 
}
