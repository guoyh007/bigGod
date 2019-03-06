import React, { Component } from 'react';
class Detail02 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="detail">
                <div className="title">
                    <ul>
                        <li className="active">
                            <div>优惠券</div>
                            <p className="line">
                            </p>
                        </li>
                    </ul>
                </div>
            
                <div className="long-line"></div>

                <div className="big-detail">
                    {/* 优惠券 */}
                    <div className="shoppipngCard">
                        <input />
                        <div className="btn">
                            确认兑换
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>
                                可使用
                            </li>
                            <li>
                                不可使用
                            </li>
                        </ul>
                        <p className="line"></p>
                        {/* 这个是现象卡  下边的线 */}
                    </div>
                </div>
            </div> 
        );
    }
}

export default Detail02;