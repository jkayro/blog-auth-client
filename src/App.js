import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home";
import AppMenu from './components/AppMenu';
import CreateUser from './components/CreateUser';
import EditUser from "./components/EditUser";
import RequestPassword from "./components/RequestPassword";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ListArticles from "./components/ListArticles";
import ListUserArticles from "./components/ListUserArticles";
import CreateArticle from "./components/CreateArticle";
import ViewArticle from "./components/ViewArticle";
import EditArticle from "./components/EditArticle";

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import './index.css';

function App() {

  function getSessionOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return stored;
  }

  let [isAuthenticated, setIsAuthenticated] = useState(getSessionOrDefault('isAuthenticated', false)); 
  let [client, setClient] = useState(getSessionOrDefault('client', ''));
  let [accessToken, setAccessToken] = useState(getSessionOrDefault('accessToken', ''));
  let [email, setEmail] = useState(getSessionOrDefault('email', ''));
  

    const baseUrl = 'http://localhost:3001';
    //const baseUrl = 'https://auth-api-blog.herokuapp.com';

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="p-grid p-justify-center nested-grid">
        <div className="p-col-2"></div>
        <div className="p-col-8" style={{padding: 1 }}>
          <AppMenu authenticated={ isAuthenticated }/>
        </div>
        <div className="p-col-2"></div>
        <Switch>
          <Route path="/home">
            <div className="p-grid p-justify-center">
              <div className="p-col-12">
                <Home />  
              </div>
            </div>
          </Route> 
          <Route path="/create-user">
            <div className="p-col-4"></div>
            <div className="p-col-4">
              <CreateUser baseUrl={baseUrl} />  
            </div>
            <div className="p-col-4"></div>
          </Route> 
          <Route path="/edit-user">
            <div className="p-col-4"></div>
            <div className="p-col-4">
              <EditUser 
                baseUrl={baseUrl} 
                email={email}
                client={client}
                accessToken={accessToken}
              />  
            </div>
            <div className="p-col-4"></div>
          </Route> 
          <Route path="/login">
            <div className="p-col-4"></div>
            <div className="p-col-4">
              <Login 
                baseUrl={baseUrl} 
                setIsAuthenticated={setIsAuthenticated} 
                setEmail={setEmail} 
                setClient={setClient} 
                setAccessToken={setAccessToken}
              />  
            </div>
            <div className="p-col-4"></div>
          </Route> 
          <Route path="/request-password">
            <div className="p-col-4"></div>
            <div className="p-col-4">
              <RequestPassword baseUrl={baseUrl} />  
            </div>
            <div className="p-col-4"></div>
          </Route> 
          <Route path="/reset-password">
            <div className="p-col-4"></div>
            <div className="p-col-4">
              <ResetPassword baseUrl={baseUrl} />  
            </div>
            <div className="p-col-4"></div>
          </Route> 
          <Route path="/list-articles">
            <div className="p-col-2"></div>
            <div className="p-col-8">
              <ListArticles baseUrl={baseUrl} />  
            </div>
            <div className="p-col-2"></div>
          </Route> 
          <Route path="/list-user-articles">
            <div className="p-col-2"></div>
            <div className="p-col-8">
              <ListUserArticles 
                baseUrl={baseUrl} 
                email={email}
                client={client}
                accessToken={accessToken}
              />  
            </div>
            <div className="p-col-2"></div>
          </Route> 
          <Route path="/view-article/:id">
            <div className="p-col-2"></div>
            <div className="p-col-8">
            <ViewArticle 
                baseUrl={baseUrl} 
                isAuthenticated={isAuthenticated} 
            />
            </div>
            <div className="p-col-2"></div>
          </Route> 
          <Route path="/edit-article/:id">
            <div className="p-col-3"></div>
            <div className="p-col-6">
            <EditArticle 
                baseUrl={baseUrl} 
                email={email}
                client={client}
                accessToken={accessToken}
            />
            </div>
            <div className="p-col-3"></div>
          </Route> 
          <Route path="/create-article">
            <div className="p-col-3"></div>
            <div className="p-col-6">
            <CreateArticle 
                baseUrl={baseUrl} 
                email={email}
                client={client}
                accessToken={accessToken}
            />
            </div>
            <div className="p-col-3"></div>
          </Route> 
          <Route path="/logout">
              <Logout  
                baseUrl={baseUrl} 
                email={email}
                client={client}
                accessToken={accessToken}
                setIsAuthenticated={setIsAuthenticated}
                setEmail={setEmail} 
                setClient={setClient} 
                setAccessToken={setAccessToken}
              />  
          </Route> 
          <Route exact path="/" render={() => {
             return (!isAuthenticated ? <Redirect to="/list-articles" /> : <Redirect to="/list-user-articles" />) 
          }} />
        </Switch>
    </div>
    </Router>
  );
};
export default App;
