import React from 'react';


//NotFound component for displaying a user friendly message when the 
//URL Parameters search return no results
//added a Return Home button 
const NotFound = () => (
    <div className='not-found'> 
        <h3>Opps! Page Not Found.</h3> 
        <h1>404</h1>
        <p>We can't find the page you're looking for.</p>
        <a className='return' href='/'>Homepage</a>   
    </div>
);
export default NotFound;