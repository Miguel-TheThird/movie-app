import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash' //Lodash is an optimized version of a library called underscore

const Pagination = props => {
    console.log("Receiving current Page" ,props.currentPage); 
    const itemsCount = props.itemsCount
    const pageSize = props.pageSize
    //const {itemsCount, pageSize} = props;
    console.log("itemsCount", itemsCount)
    console.log("pageSize",pageSize)
    const pagesCount = Math.ceil(itemsCount / pageSize);
    //pagesCount can be 1 or 2 or whatever, based on that we need to create an array with numbers ranginf from 
    //[1 ... all the way to pagesCount ].map() we do this using lodash to generate an array with this numbers.  
    console.log("This is it" , pagesCount)
    if(pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1) //Have to add 1 here because this method will not include this end number itself(the last page/number in a array)
    //then map the items in this array to list items.
    return ( 
        <nav >
  <ul className="pagination">
      {pages.map(page => (
      <li key={page}  className={ page === props.currentPage ? "page-item active" : "page-item"}>
          <a className="page-link"  onClick={() => props.onPageChange(page)} href="/">{page} </a>
        </li>
    ))}
    </ul>
</nav>
     );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}
 
export default Pagination;