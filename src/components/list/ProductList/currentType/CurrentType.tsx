import { Divider, ListItem, ListItemText } from "@mui/material";
import { LayoutContext } from "../../../../context/LayoutContext";

import React, { useContext } from "react";


interface FlaversType {
    type: string;
}

export function CurrentType({ produtos, index, selectedType }: {produtos: FlaversType, index: number, selectedType: (type: string) => void}) {
    const { isDesktop, isTablet } = useContext(LayoutContext);
    return (<React.Fragment key={index}>
        <ListItem className="flex justify-center hover:bg-gray-200" onClick={() => selectedType(produtos.type)}>
            <ListItemText>
                <p className="text-[20px] font-bold font-Inter-regular">{produtos.type}</p>
            </ListItemText>
        </ListItem>
        <Divider variant="middle" component="li" sx={{ width: isDesktop || isTablet ? '520px' : '280px', backgroundColor: '#0097C4', height: '3px', listStyle: 'none' }} />
    </React.Fragment>)
}
