import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    {
        table: {
            height: (props: StyleProps) => props.tableCellHeight * props.rowsPerPage + 50
        },
        tableContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30
        },
        tableHeaderCell:{
            backgroundColor: 'black',
            color: 'white',
            fontSize: 'large',
            border: '1px solid gray',
            height: 50
        },
        tableCell:{
            height: (props: StyleProps) => props.tableCellHeight,
            border: '1px solid gray',
        },
        tableRow:{
            '&:hover':{
                backgroundColor: '#ADEFD1FF',
                color: '#00203FFF',
                cursor: 'pointer',
                '& td':{
                    fontWeight: 'bold',
                }
            }
        },
    }

);

type StyleProps = {
    rowsPerPage: number;
    tableCellHeight: number;
}
