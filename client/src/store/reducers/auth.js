import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../ultility';

const initialState = {
    token: null,
    userid: null,
    roleid: null,
    error: null,
    status: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userid: action.userid,
        roleid: action.roleid,
        status: 200,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error.response.statusText,
        status: action.error.response.status,
        loading: false
    });
};

const authLogOut = (state, action) => {
    return updateObject(state, {
        token: null,
        userid: null,
        roleid: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);
        default:
            return state;
    }
};

export default reducer;