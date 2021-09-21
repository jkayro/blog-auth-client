import React, { useEffect, useState, useCallback } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const EditUser = ({ email, client, accessToken, baseUrl }) => {
    
    let [displayMessage, setDisplayMessage] = useState(false);
    let [name, setName] = useState();
    let [nickname, setNickname] = useState();

    const getData = useCallback(async () => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'uid': email,
                'client': client,
                'access-token': accessToken
            }
        };

        const url = `${baseUrl}/api/auth/validate_token`;
        
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (!response.ok) {
            window.location = '/login';
        }
        setName(data.data.name);
        setNickname(data.data.nickname);

    }, [email, client, accessToken, baseUrl]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let data = {};
        data.name = name;
        data.nickname = nickname;

        const json = JSON.stringify(data);

        const url = `${baseUrl}/api/auth`;

        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'uid': email,
                'client': client,
                'access-token': accessToken 
            },
            body: json
        };

        const response = await fetch(url, requestOptions);

        if (response.ok) {
            setDisplayMessage(true);
        }
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