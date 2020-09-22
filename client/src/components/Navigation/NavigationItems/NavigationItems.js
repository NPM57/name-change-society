import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Home Page</NavigationItem>
            {
                props.isAuthenticated ? <NavigationItem link="/dashboard">Dashboard</NavigationItem> : null
            }
            {
                !props.isAuthenticated
                    ? <NavigationItem link="/auth" >Authenticate</NavigationItem>
                    : <NavigationItem link="/logout" >Logout</NavigationItem>
            }

        </ul>
    );
};

export default navigationItems;