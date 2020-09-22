import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import { connect } from 'react-redux';

class Layout extends Component {

    render() {
        return (
            <Auxiliary>
                <nav>
                    <NavigationItems isAuthenticated={this.props.isAuthenticated} />
                </nav>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);