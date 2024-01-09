import Cookies from 'js-cookie';
import axios from 'axios';
import Constants from '../Constants';

export const remoteMOSCA = (jsonconf) => async (dispatch) => {

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = jsonconf;

    try {
        const res = await axios.post(Constants.mosguito_api_url + 'api/mosca/', body, config);

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
