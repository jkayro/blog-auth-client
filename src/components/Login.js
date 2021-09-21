import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const Login = ({ baseUrl, setIsAuthenticated, setEmail, setClient, setAccessToken }) => {

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData(e.target);
        
        let object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        
        sessionStorage.setItem('email', object['email']);
        
        let json = JSON.stringify(object);

        const url = `${baseUrl}/api/auth/sign_in`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        };

        const response = await fetch(url, requestOptions);
        if (response.ok) {
            setIsAuthenticated(true);
            setEmail(sessionStorage.getItem('email'));
            setClient(response.headers.get('client'));
            setAccessToken(response.headers.get('access-token'));

            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('client', response.headers.get('client'));
            sessionStorage.setItem('accessToken', response.headers.get('access-token'));

            history.push("/");
        }
    };
    
    const handleRequestPassword = useCallback(() => history.push('/request-password'), [history]);

    return (
        <Card title='Login' subTitle='Autenticar-se no sistema'>
        <br/>
        <form onSubmit={ handleSubmit }>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText name="email" id="email" type="text" required />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Senha</label>
                    <Password name="password"  feedback={false} required />
                </div>
            </div>
            <Button 
                type="submit" 
                className="p-button-sm" 
                label="Logar" 
            />
            {' '}
            <Button 
                type="button" 
                className="p-button-sm" 
                label="Esqueceu a senha?"
                onClick={(e) => handleRequestPassword()} 
            />
        </form>
        </Card>
    );
};
export default Login;