import {
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    ADD_RATING_SUCCESS,
    ADD_RATING_FAIL,
    UPDATE_RATING_SUCCESS,
    UPDATE_RATING_FAIL,
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
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    message: null,
};

export default function (state = initialState, action) {
    const { type, message, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                message: message,
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload,
                message: message,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                message: message,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                message: message,
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                message: message,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case ADD_RATING_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case UPDATE_RATING_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case ACTIVATION_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case PASSWORD_UPDATE_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case PASSWORD_RECOVERY_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case UPDATE_USERNAME_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case DELETE_SOLUTION_SUCCESS:
            return {
                ...state,
                message: message,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                message: message,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                message: message,
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                message: message,
            }
        case ADD_COMMENT_FAIL:
            return {
                ...state,
                message: message,
            }
        case DELETE_COMMENT_FAIL:
            return {
                ...state,
                message: message,
            }
        case ADD_RATING_FAIL:
            return {
                ...state,
                message: message,
            }
        case UPDATE_RATING_FAIL:
            return {
                ...state,
                message: message,
            }
        case ACTIVATION_FAIL:
            return {
                ...state,
                message: message,
            }
        case PASSWORD_UPDATE_FAIL:
            return {
                ...state,
                message: message,
            }
        case PASSWORD_RECOVERY_FAIL:
            return {
                ...state,
                message: message,
            }
        case UPDATE_USER_INFO_FAIL:
            return {
                ...state,
                message: message,
            }
        case UPDATE_USERNAME_FAIL:
            return {
                ...state,
                message: message,
            }
        case DELETE_SOLUTION_FAIL:
            return {
                ...state,
                message: message,
            }
        default:
            return state
    };
};
