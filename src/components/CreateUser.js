import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import { useHistory } from 'react-router-dom';

const CreateUser = ({ baseUrl }) => {

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData(e.target);
        
        let object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        let json = JSON.stringify(object);
        
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );

        const url = `${baseUrl}/api/auth`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        };

        const response = await fetch(url, requestOptions);
        if (response.status === 200 || response.status === 201) {
            history.push('/login');
        }
        return response.json();
    };
    

    return (
        <Card title='Usuário' subTitle='Cadastrar novo usuário'>
        <br/>
        <form onSubmit={ handleSubmit }>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText name="email" id="email" type="text" required />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Senha</label>
                    <Password name="password" required />
                </div>
                <div className="p-field">
                    <label htmlFor="password_confirmation">Confirmação de senha</label>
                    <Password  name="password_confirmation" feedback={false} required />
                </div>
            </div>
            <Button type="submit" className="p-button-sm" label="Enviar" />
        </form>
        </Card>
    );
};

export default CreateUser;