import React from 'react';

//Use bracket notation to access properties dynamically

const ListGroup = (props) => {
    return(
        <ul className="list-group">
            {props.items.map(item =>( 
            <li key={item._id}
            onClick={() => props.onItemSelect(item)} 
             
            className={item === props.selectedItem ? "list-group-item active" : "list-group-item"}
            
            >
            {item.name}
            </li>))}            
        </ul>
    );    
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

 
export default ListGroup;