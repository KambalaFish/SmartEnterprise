import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        border: '1px solid gray',
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    buttonContainer: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(0.5),
    },
    button: {
        borderRadius: theme.spacing(2)
    },
}));

export default useStyles;
