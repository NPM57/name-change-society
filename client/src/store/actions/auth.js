import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userid, roleid) => {
    console.log(actionTypes);
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userid: userid,
        roleid: roleid
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('roleid');
    // localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('/login', authData)
            .then(response => {
                console.log(response.data);
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userid', response.data.userid);
                localStorage.setItem('roleid', response.data.roleid);
                // localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token, response.data.userid, response.data.roleid));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userid = localStorage.getItem('userid');
            const roleid = localStorage.getItem('roleid');
            dispatch(authSuccess(token,userid,roleid));
        }
    }
}