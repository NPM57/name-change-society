import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Profile.module.css'
import axios from '../../../axios-config';
import { connect } from 'react-redux';

class Profile extends Component {

    state = {
        profile: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        info: {
            name: '',
            email: '',
            role: '',
            updated_time: '',
            error:'',
            customMessage:''
        },
        formIsValid: false,
        loading: true,
        isReloadRequired: false
    }

    updateData() {
        const config = {
            headers: { Authorization: `Bearer ${this.props.token}` }
        };

        axios.get('/user', config)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data);
                    this.setState({
                        info: {
                            name: res.data.data.name,
                            email: res.data.data.email,
                            role: res.data.data.role.name,
                            updated_time: res.data.data.updated_name_at
                        },
                        loading: false
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate() {
        if (this.state.isReloadRequired) {
            this.updateData();
            this.setState({   
                isReloadRequired: false,
                loading: true
            })
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();

        const config = {
            headers: { Authorization: `Bearer ${this.props.token}` }
        };
        const body = {
            name: this.state.profile.name.value
        }

        axios.put('/user/info', body, config)
            .then(res => {
                console.log(res);
                if (res.status === 202) {
                    this.setState({
                        profile: {
                            name: {
                                value: ''
                            }
                        },
                        isReloadRequired: true,
                        loading: true
                    });
                }
            })
            .catch(error => {    
                this.setState({
                    info:{
                        error: error.message,
                        customMessage: 'Either you have use this name before or Someone else is using it. Please try with another name!'
                    }
                })
            });
    }

    inputChangedHandler = (event, controlName) => {
        console.log(event.target.value);
        console.log('inputChangedHandler',controlName);
        const updatedControl = {
            ...this.state.profile,
            [controlName]: {
                ...this.state.profile[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.profile[controlName].validation),
                touched: true
            }
        };
        console.log(updatedControl);
        this.setState({ profile: updatedControl });
    }


    render() {
        const error = this.state.info.customMessage;
        const formElementArray = [];
        for (let key in this.state.profile) {
            formElementArray.push({
                id: key,
                config: this.state.profile[key]
            })
        }

        const form = formElementArray.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            )
        });

        let readOnlyInfo = (<form>
            <label>Current Name: </label>
            <input type="text" value={this.state.info.name} readOnly /> <br />
            <label>Email Address: </label>
            <input type="text" value={this.state.info.email} readOnly /> <br />
            <label>Account Type: </label>
            <input type="text" value={this.state.info.role} readOnly /> <br />
            <label>Updated At: </label>
            <input type="text" value={this.state.info.updated_time} readOnly />
        </form>);

        if (this.state.loading) {
            readOnlyInfo = <Spinner />
        }

        return (
            <div className={classes.Profile}>
                <p className={classes.Error}>{error}</p>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit your new Name</Button>
                </form>
                <hr></hr>
                {readOnlyInfo}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Profile);