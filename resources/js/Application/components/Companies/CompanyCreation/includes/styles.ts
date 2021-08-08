import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles( (theme) => ({
            mt:{
                marginTop: theme.spacing(2),
            },
            formHeader:{
                paddingLeft: theme.spacing(3),
            },
            container: {
                height: '82vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                //alignItems: 'center',
                alignItems: 'flex-start',
                marginTop: theme.spacing(2),
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
            },
            divider:{
                background: theme.palette.divider
            }
        }
    )
);
