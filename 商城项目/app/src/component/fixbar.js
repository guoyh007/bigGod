import React, { Component } from 'react';

import './fixbar.css';//引入css，他自己的css
class Fixbar extends Component {
    click=()=>{
        let time = window.pageYOffset;
        // console.log(time);
        (function annimate() {
            let timer = requestAnimationFrame(annimate);
            // console.log(2);
            time -= 100;
            if (time <= 0) {
                time = 0;
                cancelAnimationFrame(timer);
            }
            window.scrollTo(0, time);
        })();
    }
    render() {
        return (
        <div id="fixBar" className="fixBar">
            <ul>
                <li>
                    <div className="img"></div>
                    <p>联系客服</p>
                    <div className="fix-server">
                        <div className="content">
                            <p className="info-title">小米有品平台问题，建议反馈，商户和物流问题投诉等请拨打 小米有品客服热线</p>
                            <p className="info-phone">400-100-1199</p>
                            <p className="info-day">(周一至周日 8：00-18：00)</p>
                            <p className="info-des">小米/米家自营品牌，手机电视智能硬件商品或订单发货/退款售后问题 请拨打小米自营客服热线</p>
                            <p className="info-phone">400-100-5678</p>
                            <p className="info-day">(周一至周日 8：00-18：00)</p>
                        </div>
                        <div className="triangle"></div>
                    </div>
                </li>
                <li>
                    <div className="img"></div>
                    <p>下载APP</p>
                    <div className="fix-code">
                        <div className="content">
                            <img src={require("../img/code.90b4b51a.png")} alt="" />
                            <p>
                                下载小米有品APP
                                得新人礼包
                            </p>                
                        </div>
                        <div className="triangle" ></div>
                    </div>
                </li>
                <li>
                    <div className="img"></div>
                    <p>新人有礼</p>
                    <div className="fix-gift">
                        <div className="content">
                            <div></div>
                            <img src={require("../img/code.90b4b51a.png")} alt="" />
                        </div>
                        <div className="triangle" ></div>
                    </div>
                </li>
                <li>
                    <div className="img"></div>
                    <p>关注微信</p>
                    <div className="fix-gift">
                        <div className="content">
                            <img src={require("../img/wx_code.d0d26888.jpg")} alt="" />
                            <p className="site-info">立即扫码下载·小米有品 APP</p>
                        </div>
                        <div className="triangle" ></div>
                    </div>
                </li>
                <li 
                    id="backTotop"
                    onClick={this.click}
                >
                    <div className="img"></div>
                    <p>回到顶部</p>
                </li>
            </ul>
        </div>
        );
    }
}

export default Fixbar;