import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mt: {
        marginTop: theme.spacing(2),
    },
    container: {
        padding: theme.spacing(4),
        borderRadius: 16
    }
}));

export default useStyles;
