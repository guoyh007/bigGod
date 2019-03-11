import React, { Component } from 'react';

import './footer.css';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
        <div id="m-footer">
            <hr/>
            <div className="m-footer-container">
                <div className="m-f-logo">
                    <img src={require("../img/m-logo.png")} alt="" />
                    版权归博观信达商城所有
                </div>
                <div className="f-info">
                    <div className="f-info-fr">
                        <p>
                            <span>
                                ©mi.com 京ICP证110507号 京ICP备10046444号 
                            </span>
                            <span>
                                京公网安备11010802020134号 京网文[2014]0059-0009号
                            </span>
                        </p>    
                        <p>
                            <span>
                                企业名称：博观信达科技有限责任公司
                            </span>
                            <span>
                                经营证照
                            </span>
                            <span>
                                联系电话：010-60606666
                            </span>
                            <span>
                                关于我们 入驻有品
                            </span>
                        </p>    
                    </div>
                    <div className="f-logo">
                        <img src={require("../img/f-logo.png")} alt="" />
                    </div>
                </div>
            </div>
        </div> 
        );
    }
}

export default Footer;