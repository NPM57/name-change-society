import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Profile from './Profile/Profile';
import ListUser from './ListUser/ListUser';
import HistoricalName from './HistoricalName/HistoricalName';
import Button from '../../components/UI/Button/Button';
import classes from './Dashboard.module.css';
import axios from '../../axios-config';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as constant from '../../constant';

class Dashboard extends Component {

    state = {
        // isAdmin: false,
        tab: {
            historicalName: true,
            management: false,
        },
        error: '',
    }

    // componentDidMount() {
    //     this.setState({
    //         isAdmin: this.props.roleid === constant.ACCOUNT_ADMIN_TYPE
    //     })
    // }

    switchTabHandler = (event) => {
        event.preventDefault();
        console.log(this.props.roleid);
        console.log(constant.ACCOUNT_ADMIN_TYPE);
        if (this.props.roleid != constant.ACCOUNT_ADMIN_TYPE) {
            this.setState({
                error: `You don't have permission to switch to Management Tab`
            })
        }

        this.setState({
            tab: {
                historicalName: !this.state.tab.historicalName,
                management: !this.state.tab.management
            }
        })
    }


    render() {
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/auth" />
        }

        let selectedTab = <HistoricalName></HistoricalName>;
        let tabText = 'Go to User Management';


        if (this.props.roleid && this.state.tab.management) {
            selectedTab = <ListUser></ListUser>
            tabText = 'Go to your historical name';
        }


        return (
            <Auxiliary>
                {authRedirect}
                <div className={classes.ErrorText}>{this.state.error}</div>
                <Button btnType="Success" clicked={this.switchTabHandler}>{tabText}</Button>

                <div className={[classes.LeftSection, classes.Split].join(' ')}>
                    {selectedTab}
                </div>
                <div className={[classes.RightSection, classes.Split].join(' ')}>
                    <Profile> </Profile>
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        roleid: state.auth.roleid,
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Dashboard);