import Cookies from 'js-cookie';
import axios from 'axios';
import Constants from '../Constants';
import store from '../store'
import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAIL,
    PASSWORD_RECOVERY_SUCCESS,
    PASSWORD_RECOVERY_FAIL,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,
    UPDATE_USERNAME_SUCCESS,
    UPDATE_USERNAME_FAIL,
    DELETE_SOLUTION_SUCCESS,
    DELETE_SOLUTION_FAIL,
} from './types';

export const load_user = () => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(Constants.mosguito_api_url + 'authentication/user', config);


        if (res.data.error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL,
                message: res.data.error
            });
        } else {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                message: null,
                payload: res.data
            });
        }
    } catch (err) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL,
            message: "Something went wrong when retrieving user information. Please try again later."
        });
    }
};

export const checkAuthenticated = () => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(Constants.mosguito_api_url + 'authentication/authenticated', config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATED_FAIL,
                message: res.data.error,
                payload: false
            });
        }
        else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                message: null,
                payload: true
            });
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                message: res.data.error,
                payload: false
            });
        }
    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            message: "Something went wrong when checking authentication status. Please try again later.",
            payload: false
        });
    }
};

export const login = (username, password) => async (dispatch) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(Constants.mosguito_api_url + 'authentication/login', body, config);

        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS,
                message: null
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            message: "Something went wrong when logging in. Please try again later."
        });
    }
};

export const authlogin = async (email, first_name, last_name) => {

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ email, first_name, last_name });

    try {
        const url = Constants.mosguito_api_url + 'authentication/authlogin'
        const res = await axios.post(url, body, config);

        if (res.data.success) {
            store.dispatch({
                type: LOGIN_SUCCESS,
                message: null
            });
            store.dispatch(load_user());
        } else {
            store.dispatch({
                type: LOGIN_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        store.dispatch({
            type: LOGIN_FAIL,
            message: "Something went wrong when logging in. Please try again later."
        });
    }
}; 

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        await axios.get(Constants.mosguito_api_url + 'authentication/activation/' + uid + "/" + token, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
            message: null
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
            message: "Something went wrong when activating the account."
        })
    }
};

export const password_recovery = (username) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        "username": username
    });

    try {
        const res = await axios.post(Constants.mosguito_api_url + 'authentication/password-recovery', body, config);

        if (res.data.success) {
            dispatch({
                type: PASSWORD_RECOVERY_SUCCESS,
                message: null
            });
        } else {
            dispatch({
                type: PASSWORD_RECOVERY_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        dispatch({
            type: PASSWORD_RECOVERY_FAIL,
            message: "Something went wrong when updating the password."
        })
    }
};

export const password_update = (uid, token, password1, password2) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        "password1": password1,
        "password2": password2
    });

    try {
        const res = await axios.post(Constants.mosguito_api_url + 'authentication/password-update/' + uid + "/" + token, body, config);

        if (res.data.success) {
            dispatch({
                type: PASSWORD_UPDATE_SUCCESS,
                message: null
            });
        } else {
            dispatch({
                type: PASSWORD_UPDATE_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        dispatch({
            type: PASSWORD_UPDATE_FAIL,
            message: "Something went wrong when updating the password."
        })
    }
};

export const logout = () => async dispatch => {

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(Constants.mosguito_api_url + 'authentication/logout', body, config);

        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS,
                message: null
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL,
            message: "Something went wrong when logging out. Please try again later."
        });
    }
};

export const delete_user = () => async dispatch => {

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.delete(Constants.mosguito_api_url + 'authentication/delete', config, body);

        if (res.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS,
                message: null
            });
        } else {
            dispatch({
                type: DELETE_USER_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL,
            message: "Something went wrong when trying to delete user. Please try again later."
        });
    }
};


export const update_username = (username) => async dispatch => {

    try {
        const res = await axios({
            method: 'put',
            url: Constants.mosguito_api_url + 'authentication/update-username',
            data: {
                username: username
            },
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        });

        if (res.data.success) {
            dispatch({
                type: UPDATE_USERNAME_SUCCESS,
                message: null
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: UPDATE_USERNAME_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_USERNAME_FAIL,
            message: "Something went wrong when trying to update the username. Please try again later."
        });
    }
};

export const update_user_info = (first_name, last_name) => async dispatch => {

    try {
        const res = await axios({
            method: 'put',
            url: Constants.mosguito_api_url + 'authentication/update-user-info',
            data: {
                first_name: first_name,
                last_name: last_name
            },
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        });

        if (res.data.success) {
            dispatch({
                type: UPDATE_USER_INFO_SUCCESS,
                message: null
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: UPDATE_USER_INFO_FAIL,
                message: res.data.error
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_USER_INFO_FAIL,
            message: "Something went wrong when trying to update the user data. Please try again later."
        });
    }
};

export const remove_solution = (solution_id) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        solution_id: solution_id
    });

    try {
        const res = await axios.post(Constants.mosguito_api_url + 'authentication/delete-solution', body, config);

        if (res.data.error) {
            dispatch({
                type: DELETE_SOLUTION_FAIL,
                message: res.data.error
            });
        } else {
            dispatch({
                type: DELETE_SOLUTION_SUCCESS,
                message: null
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_SOLUTION_FAIL,
            message: "Something went wrong when removing the solution from the database. Please try again later."
        });
    }
};
