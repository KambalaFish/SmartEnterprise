import {Typography} from "@material-ui/core";
import React from "react";

export function Copyright(): JSX.Element {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Task management tool © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
