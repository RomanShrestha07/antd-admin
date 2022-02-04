import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Routes from "./routes";

function App() {
    return (
        <div>
            <Routes/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
