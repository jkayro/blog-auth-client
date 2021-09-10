import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const EditUser = ({ email, client, accessToken, baseUrl }) => {
    
    let [displayMessage, setDisplayMessage] = useState(false);
    let [name, setName] = useState();
    let [nickname, setNickname] = useState();

    useEffect(() => {
        const getData = () => {
            const headers = { 
                'Content-Type': 'application/json',
                'uid': email,
                'client': client,
                'access-token': accessToken
            }
            const url = `${baseUrl}/api/auth/validate_token`;
            fetch(url, { headers }, {method: "GET"} )
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        window.location = '/login';
                        return Promise.reject(error);
                    }
                    setName(data.data.name);
                    setNickname(data.data.nickname);
                })
                .catch(error => {
                    console.log('>---ERROS---> ', error);
                });
        };
        getData();
    }, [email, client, accessToken, baseUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let data = {};
        data.name = name;
        data.nickname = nickname;

        const json = JSON.stringify(data);

        const url = `${baseUrl}/api/auth`;

        fetch(url, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'uid': email,
                'client': client,
                'access-token': accessToken 
            },
            body: json
        }).then(function(response) {
            if (response.ok) {
                setDisplayMessage(true);
            }
            return response.json();
        });
    };

    return (
        <>
        <Card title='Editar usuário' subTitle='Faça as alterações necessárias e clique em salvar'>
        <br/>
        <form onSubmit={ handleSubmit }>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="name">Nome</label>
                    <InputText 
                        name="name" 
                        id="name" 
                        type="text" 
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="nickname">Nickname</label>
                    <InputText 
                        name="nickname" 
                        id="nickname" 
                        type="text" 
                        defaultValue={nickname}
                        onChange={(e) => setNickname(e.target.value)}
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
        {displayMessage ? <><br /><Message severity="success" text="Alterações salvas com sucesso!" /></> : null }
        </>
    );
};
export default EditUser;