import { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

const Logout = ({ baseUrl, email, client, accessToken, 
                  setIsAuthenticated, setEmail, setClient, setAccessToken }) => {

    let [status, setStatus] = useState(0);
    let history = useHistory();

    useEffect(() => {
        const logout = () =>{
            const url = `${baseUrl}/api/auth/sign_out`;
            fetch(url, {
                method: 'DELETE',
                headers: { 
                    'uid': email,
                    'client': client,
                    'access-token': accessToken
                }}).then(function(resp) {
                if (resp.status === 200) {

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
                return resp.json();
            })
            .catch(error => {
                console.error('---ERROS---', error);
            });
        };
        logout();
    }, [baseUrl, email, client, accessToken, setIsAuthenticated, setEmail, setClient, setAccessToken, history]);

    return(
        <>
            {status === 200 ? <Redirect to='/login' /> : <h4>conectado</h4>}
        </>
    );

};
export default Logout;
