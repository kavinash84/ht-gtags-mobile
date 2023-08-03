import React from "react";
import Div from 'hometown-components/lib/Div';
import '../../../static/fonts/Chillax-Semibold.ttf';

const Ellipse = require('../../../static/smartsters/ellipse.png')


import "./Marquee.css";

const Marquee = () => {
    return (
        <Div style={{ width: '100%', margin: '60px auto' }}>
            <section className="mainSection">
                <div className="divmain">
                    <section class="news-message">
                        <p className="marquee">Ergonomic Designs</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Waterproof Paints</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Scratch-Proof Laminates</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Designed for Safety, Self-Sufficiency, Durability & Growth</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Hypo-allergenic Protection</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                    </section>
                    <section class="news-message">
                        <p className="marquee">Ergonomic Designs</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Waterproof Paints</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Scratch-Proof Laminates</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Designed for Safety, Self-Sufficiency, Durability & Growth</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                        <p className="marquee">Hypo-allergenic Protection</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '15px', height: '15px', width: '30px' }} />
                    </section>
                </div>
            </section>
        </Div>
    )
}

export default Marquee;


