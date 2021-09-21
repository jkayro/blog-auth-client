import React, { useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const ResetPassword = ({ baseUrl }) => {

    const query = useQuery();

    let [password, setPassword] = useState();
    let [confirmation, setConfirmation] = useState();
    let [message, setMessage] = useState();
    let [displayMessage, setDisplayMessage] = useState(false);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        let data = {}
        data.password = password;
        data.password_confirmation = confirmation;

        const json = JSON.stringify(data);

        const url = `${baseUrl}/api/auth/password`;

        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'uid': query.get("uid"),
                'client': query.get("client"),
                'access-token': query.get("access-token"),
                'token': query.get("token")
            },
            body: json
        };
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            setMessage('Senha alterada com sucesso! Faça o login...');
            setDisplayMessage(true);
        }
    };

    return (
    <>
        <Card title='Nova senha' subTitle='Digite a nova senha e confirme'>
        <br/>
        <form onSubmit={ handleSubmit }>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="password">Nova senha</label>
                    <Password 
                        name="password"  
                        feedback={false} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="password_confirmation">Confirme a senha</label>
                    <Password 
                        name="password_confirmation"  
                        feedback={false} 
                        onChange={(e) => setConfirmation(e.target.value)}
                        required 
                    />
                </div>
            </div>
            <Button 
                type="submit" 
                className="p-button-sm" 
                label="Salvar" 
            />
        </form>
        </Card>
        {displayMessage ? <><br /><Message severity="success" text={message} /></> : null }
    </>
  );
};
export default ResetPassword;