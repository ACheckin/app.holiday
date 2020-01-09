import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import OwlCarousel from 'react-owl-carousel2';
import './owl2.css';
import './animate.css';
import './lixi.css';

const options = {
    items: 1,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 500,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    loop: true,
};
const options2 = {
    items: 1,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 500,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    loop: true,
};


const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>56</span>;
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };

class App extends Component {

    render() {
        return (
            <div className="wrap pagelaclixi">
                <div className="bg fixed"></div>

                <div className="hoatop fixed shake">
                    <div> <img  src={require('./image/hoamai.png')} /></div>
                    {/* <OwlCarousel options={options}>
                        <div> <img  src={require('./image/hoamai.png')} /></div>
                        <div> <img  src={require('./image/hoadao.png')} /></div>
                        <div> <img  src={require('./image/hoamai.png')} /></div>
                        <div> <img  src={require('./image/hoadao.png')} /></div>
                    </OwlCarousel> */}
                </div>

                <div className="canhhoa fixed">
                    <OwlCarousel options={options2}>
                        <div>
                            <div className="snowflakes">
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoamai1.png')} /></div>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <div className="snowflakes">
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao2.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao3.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao2.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao3.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao1.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao2.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao3.png')} /></div>
                                </div>
                                <div className="snowflake">
                                    <div> <img  src={require('./image/hoadao1.png')} /></div>
                                </div>
                            </div>
                        </div> */}

                    </OwlCarousel>
                </div>


                <div className="lixi_wrap" >
                    <div class="animated infinite brightness slow easily nen fixed" className="nen fixed">
                        <img  src={require('./image/nen.png')} />
                    </div>
                    <div className="outer fixed">
                        <img  src={require('./image/outer.png')} />
                    </div>
                    <div className="may1 fixed ">
                        <img class="animated infinite pulse slow easily delay-1s"  src={require('./image/may1.png')} />
                    </div>
                    <div className="may2 fixed ">
                        <img class="animated infinite pulse slow easily delay-2s" src={require('./image/may2.png')} />
                    </div>

                    <div className="time_lac">
                        <img  src={require('./image/time.png')} />
                        <div className ="txt_time_lac">
                            <p>Thời gian kết thúc</p>
                            <span>
                            <Countdown
                             date={Date.now() + 60000} renderer={renderer}
                            />
                            </span>
                        </div>
                    </div>

                     {/* <div className="lixi">
                        <img  src={require('./image/molixxi.png')} />
                            <div className="btn_lac">
                                <img className="" src={require('./image/btn-lac.png')} />
                            </div>
                            <div className="light-top">
                                <img  src={require('./image/light-top.png')} />
                            </div>
                             <div className="light-bot">
                                <img  src={require('./image/light-bot.png')} />
                            </div>
                    </div> */}

                    <div className="lixi doilixi">
                        <img  src={require('./image/doilixi.png')} />
                        <div className="txt_lixi">
                            <p className="fade">- Bạn nhận được lì xì -</p>
                            <p className="show fade in">
                             Nguyễn Văn Hải vừa đổi Lì Xì 300.000đ lấy 200.000đ với bạn.<br/>Lì Xì mới của bạn là
                            </p>
                            <div className="menhgia_lixi">
                                5.500.000đ
                            </div>
                        </div>
                        <div className="btn_lac">
                            <img className="shake" src={require('./image/btn-lac.png')} />
                        </div>
                        <div className="light-bot">
                            <img  src={require('./image/light-bot.png')} />
                        </div>
                    </div>

                    <div className="action">
                        <div className="btn_lichsu ">
                            <a href="#">
                                <img  src={require('./image/btn_history.png')} />
                            </a>
                        </div>

                        <div className="btn_share ">
                            <a href="#">
                                <img  src={require('./image/btn_share.png')} />
                            </a>
                        </div>
                    </div>

                    <div className="footer fixed animated infinite slower easily delay-2s">
                        <img  src={require('./image/footer.png')} />
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
