import React from "react";

interface useMenuType {
    menuAnchor: null | HTMLElement;
    handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    isMenuOpen: boolean;
}

function useMenu(): useMenuType{

    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuAnchor(null);
    }
    const isMenuOpen = !!menuAnchor;

    return {
        menuAnchor,
        handleMenuClick,
        handleMenuClose,
        isMenuOpen
    }
}

export default useMenu;
