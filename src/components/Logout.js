import { useEffect, useState, useCallback } from "react";
import { useHistory, Redirect } from "react-router-dom";

const Logout = ({ baseUrl, email, client, accessToken, 
                  setIsAuthenticated, setEmail, setClient, setAccessToken }) => {

    let [status, setStatus] = useState(0);
    let history = useHistory();

    const logout = useCallback(async() =>{
        const url = `${baseUrl}/api/auth/sign_out`;

        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'uid': email,
                'client': client,
                'access-token': accessToken
            }
        };
        const response = await fetch(url, requestOptions);
            if (response.ok) {
                setStatus(200);
                setEmail('');
                setClient('');
                setAccessToken('');
                setIsAuthenticated(false);
                sessionStorage.removeItem('isAuthenticated');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('client');
                sessionStorage.removeItem('accessToken');
                history.push('/login');
            }
    }, [baseUrl, email, client, accessToken, setIsAuthenticated, setEmail, setClient, setAccessToken, history]);

    useEffect(() => {
        logout();
    }, [logout]);

    return(
        <>
            {status === 200 ? <Redirect to='/login' /> : <h4>conectado</h4>}
        </>
    );
};
export default Logout;
