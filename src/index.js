import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "./a.sass"
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy } from 'react';
const App= lazy(()=> import("./App"))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div style={{width: "100%", height: "100%", position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: "center", alignItems: 'center'}}>Loading</div>}>
    <App />
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
