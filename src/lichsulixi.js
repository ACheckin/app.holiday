import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import OwlCarousel from 'react-owl-carousel2';

import './lixi.css';
import './lichsulixi.css';



class App extends Component {   
    
    render() {
        return (
            <div className="wrap lichsu">
                <div className="bg fixed"></div>
                
                <div className="nen fixed">
                    <img  src={require('./image/nen.png')} />
                </div>
                <div className="outer fixed">
                    <img  src={require('./image/outer.png')} />
                </div>
                <div className="may1 fixed ">
                    <img  src={require('./image/may1.png')} />
                </div>
                <div className="may2 fixed ">
                    <img  src={require('./image/may2.png')} />
                </div>
              
                <div className="ketqua fixed ">
                    <img  src={require('./image/bg-ketqua.png')} />
                    <div className="txt_ketqua">
                        <p> Bạn nhận được Lì Xì </p>
                        <div className="menhgia_lixi">
                            500.000đ
                        </div>
                    </div>
                </div>

                <div className="danhsach-lichsu wrap_danhsach fixed">
                    <div className="item">
                        <div className="image-user">
                            <img src={require('./image/imguser.png')} />
                        </div>
                        <div className="info-item">
                            <b>Nguyễn Văn Hải</b>  Xì <b>500.000đ</b> lấy <b>200.000đ</b> với bạn
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-user">
                            <img src={require('./image/imguser.png')} />
                        </div>
                        <div className="info-item">
                            <b>Nguyễn Văn Hải</b> vừa đổi  Lì Xì <b>500.000đ</b> lấy <b>200.000đ</b> với bạn
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-user">
                            <img src={require('./image/imguser.png')} />
                        </div>
                        <div className="info-item">
                            <b>Nguyễn Văn Hải</b> vừa đổi  Lì Xì <b>500.000đ</b> lấy <b>200.000đ</b> với bạn
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-user">
                            <img src={require('./image/imguser.png')} />
                        </div>
                        <div className="info-item">
                            <b>Nguyễn Văn Hải</b> vừa đổi  Lì Xì <b>500.000đ</b> lấy <b>200.000đ</b> với bạn
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-user">
                            <img src={require('./image/imguser.png')} />
                        </div>
                        <div className="info-item">
                            <b>Nguyễn Văn Hải</b> vừa đổi  Lì Xì <b>500.000đ</b> lấy <b>200.000đ</b> với bạn
                        </div>
                    </div>
                </div>
             
                <div id="warning-message">
                    Vui Lòng Xoay Dọc Màn Hình :)
                </div>                             
           </div>
        );
    }
}

export default App;
