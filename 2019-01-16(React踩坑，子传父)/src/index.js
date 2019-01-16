import React from 'react';//主要库
import ReactDOM from 'react-dom';
// import App from './App';
import Appx from './Appx';

//热更新
if(module.hot){
    module.hot.accept();
};

ReactDOM.render(
    <Appx />,
    document.getElementById('root')
);


