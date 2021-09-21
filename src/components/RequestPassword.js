import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const RequestPassword = ({ baseUrl }) => {

    let [email, setEmail] = useState();
    let [displayMessage, setDisplayMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let object = {};
        object.email = email;
        
        let json = JSON.stringify(object);

        const url = `${baseUrl}/api/auth/password`;

        const requestOPtions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        };

        const response = await fetch(url, requestOPtions);
        if (response.ok) {
            setDisplayMessage(true);
        }
    };
    
    return (
        <>
        <Card title='Recuperar senha' subTitle='Digite o e-mail cadastrad para recuperar a senha'>
        <br/>
        <form onSubmit={ handleSubmit }>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText 
                        name="email" 
                        id="email" 
                        type="text" 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
            </div>
            <Button type="submit" className="p-button-sm" label="Enviar" />
        </form>
        </Card>
        {displayMessage ? 
        <>
            <br />
            <Message severity="info" text="Instruções enviadas para o e-mail informado!" />
            </> : null }
        </>
    );
};
export default RequestPassword;
