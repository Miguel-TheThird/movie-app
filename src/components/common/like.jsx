import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.css';



class Like extends React.Component {
    
    render() { 
        let classes = "icon-unliked"

        if(this.props.liked){
            classes = "icon-liked"
        }

        return (        
            <FontAwesomeIcon onClick={this.props.onClick} className={classes}  icon={faHeart}/>
        );
    }
}
 
export default Like;

