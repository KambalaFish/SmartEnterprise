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
    }
}));

export default useStyles;
