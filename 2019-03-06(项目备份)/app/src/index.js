import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import reducer from './redux/reducers/reducer';
// import Login from './component/login';

if(module.hot){
    module.hot.accept();
};
const store = createStore(reducer);
// const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}> 
        <Router>
            <App/>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);

