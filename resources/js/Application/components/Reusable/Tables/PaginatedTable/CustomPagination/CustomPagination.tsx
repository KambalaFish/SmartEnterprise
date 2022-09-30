import React from "react";
import ReactPaginate from "react-paginate";
import {useStyles, styleProps} from "./includes/styles";
import {CustomPaginationProps} from "../../../../../utils/Interfaces/PropsInterfaces";

export function CustomPagination({pageCount, currentPage, setPageNumber}: CustomPaginationProps): JSX.Element{
    const classes = useStyles(styleProps);

    function changePage ({selected} : {selected : number }) {
        setPageNumber(selected + 1);
    }

    return <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        initialPage={currentPage}
        previousLabel='previuos'
        nextLabel='next'
        breakLabel={'...'}
        breakLinkClassName={classes.pageLink+' '+classes.breaker}
        onPageChange={changePage}
        forcePage={currentPage}
        disableInitialCallback={true}
        containerClassName={classes.paginationContainer}
        pageLinkClassName={classes.pageLink}
        previousLinkClassName={classes.movBtn +' '+ classes.previousBtn}
        nextLinkClassName={classes.movBtn +' '+ classes.nextBtn}
        activeClassName={classes.paginationActive}
        disabledClassName={classes.disableMovBtn}
    />;
}
