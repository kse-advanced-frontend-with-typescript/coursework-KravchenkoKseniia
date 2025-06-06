import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import {App} from './App';
import {BrowserRouter} from 'react-router';


const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);


root.render(<BrowserRouter basename={process.env.BASE_URL ? process.env.BASE_URL : '/'}>
    <App />
</BrowserRouter>);
export {schemaErrorToError} from './modules/clients/schemaErrorToError';
export {convertToType} from './modules/clients/convertToType';
