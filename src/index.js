import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory'
import App from './components/App';
import './style.css';
// import registerServiceWorker from './registerServiceWorker'

// const history = createBrowserHistory()

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));
// registerServiceWorker();
