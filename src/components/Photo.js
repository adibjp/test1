import React from 'react';
//import PropTypes from 'prop-types';
//import NotFound from './NotFound';

//Photo component that displays the li and img elements 
const Photo = (props) => {
        return(
            <li>
                <img src={props.url} alt='' onClick={() => window.open(props.url)}/>
            </li>
        );
    
}
export default Photo;