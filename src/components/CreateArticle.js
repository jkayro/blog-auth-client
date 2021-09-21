import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const CreateArticle = ({ email, client, accessToken, baseUrl }) => {

    let [title, setTitle] = useState('');
    let [body, setBody] = useState('');
    
    let history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let data = {}
        data.title = title;
        data.body = body;
        
        const json = JSON.stringify(data);

        const url = `${baseUrl}/api/articles`;

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'uid': email,
                'client': client,
                'access-token': accessToken 
            },
            body: json
        };

        const response = await fetch(url, requestOptions);
        if (response.status === 200 || response.status === 201) {
            history.push('/list-user-articles');
        }
        return response;
    };

    const handleReturn = useCallback(() => history.push('/list-user-articles'), [history]);

    return (
        <Card title='Novo artigo' subTitle='Insira o título e o conteúdo para criar um novo artigo'>
        <br/>
        <form onSubmit={ handleSubmit }>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="titulo">Titulo</label>
                    <InputText 
                        name="titulo" 
                        id="titulo" 
                        type="text" 
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                </div>
                <InputTextarea 
                    rows={5} 
                    cols={30} 
                    onChange={(e) => setBody(e.target.value)}
                    autoResize 
                />
            </div>
            <Button 
                type="submit" 
                className="p-button-sm" 
                label="Salvar" 
            />
            {' '}
            <Button 
                type="button" 
                className="p-button-sm" 
                label="Voltar" 
                onClick={(e) => handleReturn()} 
            />
        </form>
        </Card>
    );
};
export default CreateArticle;