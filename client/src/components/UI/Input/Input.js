import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    let validationError = null;

    if (props.invalid && props.touched) {
        validationError = props.errorMessage;
    }
    
    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig} value=
                {props.value}
                onChange={props.changed}
            />
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            <div className={classes.ErrorMessage}>{validationError}</div>
            {inputElement}
        </div>
    )
};


export default input;