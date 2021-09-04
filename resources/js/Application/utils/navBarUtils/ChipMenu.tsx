import React from "react";
import {Chip, MenuItem} from "@material-ui/core";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import {CustomMenu} from "./CustomMenu";
import useMenu from "./useMenu";

interface ChipMenuProps {
    label: string;
    menuItems: ChipMenuItem[];
}

interface ChipMenuItem{
    onClick: () => void;
    label: string;
}

function ChipMenu({label, menuItems}: ChipMenuProps): JSX.Element{
    const {
        menuAnchor,
        handleMenuClick,
        handleMenuClose,
        isMenuOpen
    } = useMenu();

    return <>
        <Chip
            label={label}
            onClick={handleMenuClick}
            icon={<ExpandMoreRoundedIcon/>}
            style={{marginRight: 10}}
        />
        <CustomMenu
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                menuItems.map(({label, onClick}) => (
                    <MenuItem key={label} onClick={() => {onClick(); handleMenuClose();}}>{label}</MenuItem>
                ))
            }
        </CustomMenu>
    </>
}
export default ChipMenu;
