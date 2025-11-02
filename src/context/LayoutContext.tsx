import React, { createContext } from "react";
import { useMediaQuery } from "react-responsive";

// Definição dos estados globais de layout

interface LayoutContextInterface {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
}

export const LayoutContext = createContext<LayoutContextInterface>(false as any);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const LayoutContextType = { isMobile, isTablet, isDesktop };

    return (
        <LayoutContext.Provider value={LayoutContextType}>
            {children}
        </LayoutContext.Provider>
    )
}
