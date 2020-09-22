import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-config';
import classes from './HomePage.module.css';

class HomePage extends Component {

    state = {
        data: [],
        loading: true,
    }

    updateData() {
        axios.get('/user/nearexpire')
            .then(res => {
                if (res.status === 200) {
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
            isReloadRequired: false,
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
                    <tr key={item.id} className={classes.Tr}><td className={classes.Td}>{item.name}</td><td className={classes.Td}>{item.updated_name_at}</td></tr>
                );
            })
            content = (
                <Auxiliary>
                    <Button btnType="Success" clicked={this.refreshHandler}>Refresh</Button>
                    List Of Names that will expire in the next 28 days!
                    <table className={classes.Table}>
                        <thead className={classes.THead}>
                            <tr>
                                <th>Name</th>
                                <th>Updated Date</th>
                            </tr>
                        </thead>
                        <tbody className={classes.TBody}>{info}</tbody>
                    </table>
                </Auxiliary>
            )
        } else {
            content = "There is no name that nearly expire"
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

export default HomePage;