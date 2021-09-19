import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Fieldset } from 'primereact/fieldset';
import { Button } from "primereact/button";

const ListArticles = ({ baseUrl, email, client, accessToken }) => {
    
    let [articles, setArticles] = useState([]);

        
    useEffect(() => {
        const getData = () => {
            const headers = { 
                'Content-Type': 'application/json',
                'uid': email,
                'client': client,
                'access-token': accessToken
            }
            const url = `${baseUrl}/api/articles`;
            fetch(url, { headers }, {method: "GET"} )
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        window.location = '/login';
                        return Promise.reject(error);
                    }
                    setArticles(data);
                })
                .catch(error => {
                    console.error('---ERROS---', error);
                });
        };
        getData();
    }, [email, client, accessToken, baseUrl]);

    let history = useHistory();
    const handleView = useCallback((id) => history.push(`/view-article/${id}`), [history]);
    const handleEdit = useCallback((id) => history.push(`/edit-article/${id}`), [history]);
    const handleCreate = useCallback(() => history.push('/create-article'), [history]);

    return (
        <>
            <div className="p-col-12"> 
                <Button 
                    className="p-button-text" 
                    label="Criar novo artigo" 
                    onClick={(e) => handleCreate()}
                /> 
            </div>
           { articles.map( (article) => ( 
                <div className="p-col-12" key={article.id} >
                    <Fieldset legend={article.title}>
                        <p>
                            {
                                article.body.length >= 200 ? 
                                article.body.substring(0,200) + '...' : 
                                article.body 
                            }
                        </p>
                        <Button 
                            className="p-button-sm p-button-outlined" 
                            label="Visualizar" 
                            onClick={(e) => handleView(article.id)}
                        />
                        {' '}
                        <Button 
                            className="p-button-sm p-button-outlined" 
                            label="Editar" 
                            onClick={(e) => handleEdit(article.id)}
                        />
                    </Fieldset>
               </div>
           ))}
        </>        
    
    );
};
export default ListArticles;