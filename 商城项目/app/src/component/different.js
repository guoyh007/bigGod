import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';
import Center from './centercomponentt/center';
import Mid from './mid';
import Shoppingcar from './shoppingcar';


class Different extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Route
                    path='/center'
                    component={Center}
                    exact
                />
                <Route
                    path='/'
                    component={Mid}
                    exact
                />
                <Route
                    path='/shopping'
                    component={Shoppingcar}
                    exact
                />
            </div>
        );
    }
}

export default Different;