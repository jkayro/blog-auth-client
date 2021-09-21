import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Fieldset } from 'primereact/fieldset';
import { Button } from "primereact/button";

const ViewArticle = ({ baseUrl, isAuthenticated }) => {

    let [article, setArticle] = useState([]);
    const { id } = useParams();

    const getData = useCallback(async() => {

        const url = `${baseUrl}/api/articles/${id}`;
        
        const requestOption = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch(url, requestOption);
        const data = await response.json();
        
        if (!response.ok) {
            window.location = '/login';
        }

        setArticle(data);

    }, [baseUrl, id]);

    useEffect(() => {
        getData();
    }, [getData]);
    
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