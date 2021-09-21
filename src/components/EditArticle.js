import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const EditArticle = ({ email, client, accessToken, baseUrl }) => {

    let [article, setArticle] = useState([]);
    let [title, setTitle] = useState('');
    let [body, setBody] = useState('');
    let [displayMessage, setDisplayMessage] = useState(false);

    const { id } = useParams();
    
    let history = useHistory();

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

        const url = `${baseUrl}/api/articles/${id}`;

        const response = await fetch(url, requestOptions);
        const data = await response.json();
        
        if (response.ok) {
            setArticle(data);
            setTitle(data.title);
            setBody(data.body);
        } else {
            window.location = '/login';
        }

    }, [id, baseUrl, email, client, accessToken]);
    

    useEffect(() => {
        getData();
    }, [getData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let data = {};
        data.title = title;
        data.body = body;

        const json = JSON.stringify(data);

        const url = `${baseUrl}/api/articles/${id}`;

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

    const handleDelete = async (e) => {
        e.preventDefault();

        if (window.confirm("Você deseja realmente deletar o artigo definitivamente?") === true) {

            const url = `${baseUrl}/api/articles/${id}`;

            const requestOptions = {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'uid': email,
                    'client': client,
                    'access-token': accessToken 
                },
            };

            const response = await fetch(url, requestOptions);

            if (response.ok) {
                history.push('/list-user-articles');
            }
        }
    };

    const handleReturn = useCallback(() => history.push('/list-user-articles'), [history]);

    return (
        <>
        <Card title='Editar artigo' subTitle='Faça as alterações necessárias no artigo e clique em salvar'>
        <br/>
        <form onSubmit={ handleSubmit }>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="titulo">Titulo</label>
                    <InputText 
                        name="titulo" 
                        id="titulo" 
                        type="text" 
                        defaultValue={article.title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                </div>
                <InputTextarea 
                    rows={5} 
                    cols={30} 
                    defaultValue={article.body}
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
            {' '}
            <Button 
                type="button" 
                className="p-button-sm p-button-danger" 
                label="Deletar" 
                onClick={(e) => handleDelete(e)} 
            />
        </form>
        </Card>
        {displayMessage ? <><br /><Message severity="success" text="Alterações salvas com sucesso!" /></> : null }
        </>
    );
};
export default EditArticle;