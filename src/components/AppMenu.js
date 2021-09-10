import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useHistory } from 'react-router-dom';

const AppMenu = ({ authenticated }) => {

    let history = useHistory();

    const itemsAuthenticated = [
        {
            label: 'Home',
            icon: 'pi pi-desktop',
            command: (event) => { 
                history.push("/home");
            }
        },
        {
            label: 'Editar usuário',
            icon: 'pi pi-user-edit',
            command: (event) => {
                history.push("/edit-user");
            }
        },
        {
            label: 'Artigos',
            icon: 'pi pi-book',
            command: (event) => {
                history.push("/list-articles");
            }
        },
        {
            label: 'Sair',
            icon: 'pi pi-arrow-circle-up',
            command: (event) => { 
                history.push("/logout");
            }
        }
    ];
    const itemsNotAuthenticated = [
        {
            label: 'Home',
            icon: 'pi pi-desktop',
            command: (event) => { 
                history.push("/home");
            }
        },
        {
            label: 'Cadastrar usuário',
            icon: 'pi pi-user-plus',
            command: (event) => { 
                history.push("/create-user");
            }
        },
        {
            label: 'Logar',
            icon: 'pi pi-lock',
            command: (event) => {
                history.push("/login");
            }
        }
    ];

    return (
        <>
            {authenticated && (
                <Menubar model={ itemsAuthenticated } style={{margin: 0, padding: 0}} />
            )}
            {!authenticated && (
                <Menubar model={ itemsNotAuthenticated } style={{margin: 0, padding: 0}} />
            )}
        </>
        
    );
};
export default AppMenu;