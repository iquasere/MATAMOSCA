import React, { useEffect } from "react";
import axios from "axios";
import Constants from "../Constants";
import Cookies from 'js-cookie';

const CSRFToken = () => {

    useEffect( () => {
        const fetchData = async () => {
            try {
                await axios.get(Constants.mosguito_api_url + 'authentication/csrf_cookie');
            } catch (err) {
                console.log("Error setting the CSRF cookie");
            }
        };

        fetchData();
    }, []);
    
    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={Cookies.get('csrftoken')} />
    );

}

export default CSRFToken;
