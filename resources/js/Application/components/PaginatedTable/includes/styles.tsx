import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    {
        table: {
            // minWidth: 650,
            // border: '2px solid green',
            height: 375
        },
        tableContainer: {
            marginTop: 100,
            width: 1500,
            // border: '2px solid red',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        tableHeaderCell:{
          backgroundColor: 'black',
            color: 'white',
            fontSize: 'large',
            border: '1px solid gray'
        },
        tableCell:{
            width: 250,
            height: 75,
            border: '1px solid gray'
        }
    }

);
