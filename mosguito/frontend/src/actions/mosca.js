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
    console.log("remoteMosca at actions.mosca")
    try {
        const res = await axios.post(Constants.mosguito_api_url + 'api/mosca/', body, config);
    } catch (err) {
        dispatch({
            message: "Something went wrong when submitting."
        });
    }
};
