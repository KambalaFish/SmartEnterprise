import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    {
        paginationContainer: {
            listStyle: "none",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
            fontWeight: 'bolder'
        },
        pageLink: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '30px',
            minHeight: '30px',
            marginRight: 3,
            borderRadius: 15,
            border: (props: StyleProps) => '1px solid ' + props.backgroundColor,
            backgroundColor: (props: StyleProps) => props.backgroundColor,
            color: (props: StyleProps) => props.color,
            cursor: 'pointer',
            '&:hover': {
                border: (props: StyleProps) => '1px solid ' + props.color,
                backgroundColor: (props: StyleProps) => props.color,
                color: (props: StyleProps)=> props.backgroundColor
            }
        },
        paginationActive: {
            '& a': {
                border: (props: StyleProps) => '1px solid '+ props.color,
                backgroundColor: (props: StyleProps) => props.color,
                color: (props: StyleProps) => props.backgroundColor
            }
        },
        breaker: {
            border: (props: StyleProps) => '1px solid ' + props.backgroundColor,
            backgroundColor: (props: StyleProps) => props.backgroundColor,
            color: (props: StyleProps) => props.color,
        },
        movBtn:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '80px',
            minHeight: '30px',
            borderRadius: 15,
            border: (props: StyleProps) => '1px solid '+props.backgroundColor,
            backgroundColor: (props: StyleProps) => props.backgroundColor,
            color: (props: StyleProps) => props.color,
            cursor: 'pointer',
            '&:hover':{
                border: (props: StyleProps) => '1px solid' + props.color,
                backgroundColor: (props: StyleProps) => props.color,
                color: (props: StyleProps) => props.backgroundColor
            }
        },
        previousBtn:{
            marginRight: '20px',
        },
        nextBtn:{
            marginLeft: '20px',
        },
        disableMovBtn:{
            '& a':{
                backgroundColor: (props: StyleProps) => props.backgroundColor,
                color: (props: StyleProps) => props.backgroundColor,
                '&:hover':{
                    backgroundColor: (props: StyleProps) => props.backgroundColor,
                    color: (props: StyleProps) => props.backgroundColor,
                    border: (props: StyleProps) => '1px solid ' +  props.backgroundColor,
                }
            }
        }
    }
);
type StyleProps = {
    backgroundColor: string;
    color: string;
}

// const styleProps: StyleProps = {backgroundColor: '#606060FF', color: '#D6ED17FF'};
// const styleProps: StyleProps = {backgroundColor: '#00203FFF', color: '#ADEFD1FF'};
export const styleProps: StyleProps = {backgroundColor: '#101820FF', color: '#F2AA4CFF'};
// const styleProps: StyleProps = {backgroundColor: '#101820FF', color: '#FEE715FF'};
// const styleProps: StyleProps = {backgroundColor: '#1C1C1BFF', color: '#CE4A7EFF'};
