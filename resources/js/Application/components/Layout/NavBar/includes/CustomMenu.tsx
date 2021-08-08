import React from "react";
import {Menu, MenuProps} from "@material-ui/core";

export function CustomMenu({children,...props}: MenuProps): JSX.Element {
    return (
        <Menu
            {...props}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            getContentAnchorEl={null}
            keepMounted
        >
            {children}
        </Menu>
    )
}
