import React, { Component } from 'react';

import axios from '../../../../axios-config';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import classes from './UserItem.module.css';

class UserItem extends Component {

    state = {
        updatedData: {
            id: '',
            name: '',
            UpdateNameAt: '',
        },
        prefillData: {
            id: '',
            name: '',
            UpdateNameAt: '',
        }
    }

    componentDidMount() {
        this.setState({
            updatedData: {
                id: this.props.Id,
                name: this.props.Name,
                UpdateNameAt: this.props.UpdateNameAt
            }
        });
    }

    changedHandler = (event) => {
        console.log(this.props.Id);
        if (event.target.value != '') {
            this.setState({
                prefillData: {
                    name: event.target.value,
                    id: this.props.Id
                }
            });
        }

        console.log(this.state.prefillData);

    }

    clickHandler = () => {
        console.log(this.state.updatedData);
        console.log(this.state.prefillData);

        const config = {
            headers: { Authorization: `Bearer ${this.props.token}` }
        };
        const body = {
            name: this.state.prefillData.name
        }

        axios.put('/users/' + this.props.Id, body, config)
            .then(res => {
                console.log(res);
                if (res.status === 202) {
                    this.setState({
                        updatedData: {
                            name: res.data.name,
                            id: res.data.id,
                            UpdateNameAt: res.data.updated_name_at
                        },
                        prefillData: {
                            id: '',
                            name: '',
                            UpdateNameAt: '',
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <tr key={this.props.Id} className={classes.Tr}>
                <td className={classes.Td}>{this.state.updatedData.id}</td>
                <td className={classes.Td}>{this.state.updatedData.name}</td>
                <td className={classes.Td}><Moment format="DD MMM YYYY hh:mm:ss">{this.state.updatedData.UpdateNameAt}</Moment></td>
                <td>
                    <input type="text" onChange={this.changedHandler} />
                    <input
                        type="button"
                        value="Update Name"
                        onClick={this.clickHandler}
                        disabled={!this.state.updatedData.name}
                    />
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(UserItem);