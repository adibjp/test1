import React from 'react';
//import PropTypes from 'prop-types';

//NoResultFound component for displaying a user friendly message when the 
//search return no results 
const NoResultFound = () => {
    return(
        <li className='not-found'>
            <h3>No Results Found</h3>
            <p>You search did not return any results. Please try again.</p>
        </li>
    );
}
export default NoResultFound;