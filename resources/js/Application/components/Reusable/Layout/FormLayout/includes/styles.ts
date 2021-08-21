import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mt: {
        marginTop: theme.spacing(2),
    },
    container: {
        padding: theme.spacing(4),
        borderRadius: theme.spacing(4)
    }
}));

export default useStyles;
