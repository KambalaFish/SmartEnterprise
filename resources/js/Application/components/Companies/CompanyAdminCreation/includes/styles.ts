import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
            mt: {
                marginTop: theme.spacing(2),
            },
            mb: {
                marginBottom: theme.spacing(1),
            },
            adminForm: {
                padding: theme.spacing(4),
                borderRadius: 16
            },
            border: {
                border: '1px solid black'
            },
            formHeader: {
                paddingLeft: theme.spacing(3),
            },
            divider: {
                background: theme.palette.divider
            }
        }
    )
);
