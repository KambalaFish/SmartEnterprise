import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(3)
    },
    border: {
        border: '1px solid black'
    },
    pl: {
        paddingLeft: theme.spacing(2)
    },
    ml: {
        marginLeft: theme.spacing(3)
    },
    mb: {
        marginBottom: theme.spacing(2),
    }
}));

export default useStyles;
