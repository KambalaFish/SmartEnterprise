import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
            mt: {
                marginTop: theme.spacing(2),
            },
            mb: {
                marginBottom: theme.spacing(1),
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

export default useStyles;
