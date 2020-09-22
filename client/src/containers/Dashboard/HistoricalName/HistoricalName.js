import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-config';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import classes from './HistoricalName.module.css';

class HistoricalName extends Component {

    state = {
        data: [],
        loading: true,
    }

    updateData() {
        const config = {
            headers: { Authorization: `Bearer ${this.props.token}` }
        };

        axios.get('/user/names', config)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data);
                    this.setState({
                        data: res.data.data,
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.updateData();
    }

    refreshHandler = (event) => {
        event.preventDefault();
        this.updateData();
        this.setState({
            loading: true
        })
    }


    render() {
        let data = this.state.data;
        let content = '';
        let info = '';

        if (data.length > 0) {
            info = data.map(item => {
                return (
                    <tr key={item.id} className={classes.Tr}>
                        <td className={classes.Td}>{item.submitted_name}</td>
                        <td className={classes.Td}><Moment format="DD MMM YYYY hh:mm:ss">{item.created_at}</Moment></td>
                    </tr>
                );
            })
            content = (
                <Auxiliary>
                    <p>Historical Name of the user</p>
                    <Button btnType="Success" clicked={this.refreshHandler}>Refresh</Button>
                    <table className={classes.Table} >
                        <thead className={classes.THead}>
                        </thead>
                        <tbody className={classes.TBody}>
                            <tr className={classes.Tr}>
                                <td className={classes.Td}>Historical Name</td>
                                <td className={classes.Td}>Created Date</td>
                            </tr>
                            {info}
                        </tbody>
                    </table>
                </Auxiliary>
            )
        } else {
            content = "You have no historical name!"
        }

        if (this.state.loading) {
            content = <Spinner></Spinner>
        }

        return (
            <Auxiliary>
                { content}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(HistoricalName);