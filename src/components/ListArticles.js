import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Fieldset } from 'primereact/fieldset';
import { Button } from "primereact/button";

const ListArticles = ({ baseUrl }) => {
    
    let [articles, setArticles] = useState([]);
        
    const getData = useCallback(async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${baseUrl}/api/articles-all`;
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        setArticles(data);
    }, [baseUrl]);

    useEffect(() => {
        getData();
    }, [getData]);

    let history = useHistory();
    const handleView = useCallback((id) => history.push(`/view-article/${id}`), [history]);

    return (
        <>
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
                    </Fieldset>
               </div>
           ))}
        </>        
    
    );
};
export default ListArticles;