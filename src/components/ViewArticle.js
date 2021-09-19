import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Fieldset } from 'primereact/fieldset';
import { Button } from "primereact/button";

const ViewArticle = ({ baseUrl, isAuthenticated }) => {

    let [article, setArticle] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getData = () => {
            const headers = { 
                'Content-Type': 'application/json',
            }
            const url = `${baseUrl}/api/articles/${id}`;
            fetch(url, { headers }, {method: "GET"} )
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        window.location = '/login';
                        return Promise.reject(error);
                    }
                    setArticle(data);
                })
                .catch(error => {
                    console.error('---ERROS---', error);
                });
        };
        getData();
    }, [baseUrl, id]);
    
    let history = useHistory();

    const handleVoltar = useCallback(() => {
        isAuthenticated ? history.push('/list-user-articles') : history.push('/list-articles');
    }, [history, isAuthenticated]);
    
    return (
        <>
            <Fieldset legend={article.title}>
                <p>{ article.body }</p>
                <Button 
                    className="p-button-sm p-button-outlined" 
                    label="Voltar" 
                    onClick={(e) => handleVoltar()}
                />
            </Fieldset>
        </>
    );
}
export default ViewArticle;