import React, {Component} from "react";
import "./NFL 2_files/layout.css"
import "./NFL 2_files/normalize.css"
import {changeLogo} from "./NFL 2_files/core.js"
import BlockRevealAnimation from 'react-block-reveal-animation';
import {blue} from "@material-ui/core/colors";

export class LogoNFL extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {

        return (
            <div style={{backgroundColor: 'darkred', textAlign: 'center'}}>
                <div className="scaling-svg-container">
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 500 500"
                         id="nfl" className="scaling-svg">
                        <defs>
                            <clipPath id="mask_nfl_shield">
                                <circle cx={250} cy={280} r={90} fill="green"/>
                            </clipPath>
                        </defs>
                        <g className="outline">
                            <path className="animate_stroke stroke_black" d="M250,127.4c0,0-9.4,28.2-42.2,36.3c-18.9,4.7-33.5-2.9-41.3-8.4h-5.9v152.2c0,4,0.9,11.5,7.2,19.3
						c7.7,9.3,20.8,15.3,38.8,17.9c14.6,2.1,25.2,6.6,32.6,13.9c5.6,5.3,10.9,14.5,10.9,14.5s5.4-9.4,10.7-14.5
						c7.5-7.2,18.2-11.7,32.6-13.9c18.1-2.6,31.1-8.7,38.8-18c6.2-7.6,7.2-15.2,7.2-19V155.5h-5.9c-7.5,5.6-22.6,12.9-41.2,8.2
						C259.4,155.7,250,127.4,250,127.4"
                                  style={{stroke: 'rgb(255, 255, 255)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                            <path className="animate_stroke stroke_black" d="M249.7,139.5c0,0-11.4,22.1-41,29.4c-24.9,6.2-42.9-7.8-42.9-7.8v146.3c0,5,2.1,26.1,41.6,31.7
						c15.6,2.3,27.2,7.2,35.4,15.3c3,2.9,5.3,5.8,7,8.5c1.7-2.7,4-5.6,7-8.5c8.4-8,20-13,35.4-15.3c39.5-5.7,41.3-26.8,41.6-31.7V161.2
						c0,0-18,14.1-43.2,7.8C261.3,161.6,249.7,139.5,249.7,139.5"
                                  style={{stroke: 'rgb(255, 255, 255)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                            <path className="animate_stroke stroke_black" d="M249.7,348.4c0,0,11.7-14.1,41.3-18.7c34.2-5.2,32.9-21.2,32.9-22V231H175.8v76.7c0,0.8-1,16.8,32.9,22
						C238.4,334.3,249.7,348.4,249.7,348.4"
                                  style={{stroke: 'rgb(255, 255, 255)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                            <g>
                                <path className="animate_stroke stroke_black" d="M227.2,325l-11.1-3.3L200,274.1l0,31.4l5.1,3.9v9.7l-22.3-5.7v-8.2l5.1-2v-52.5l-5.2-2.6v-9.4h16.9l15.8,48.5
							l-0.1-36.3l-4.6-2.6v-9.4h20.8v9.4l-4.3,2.6V325z" style={{
                                    stroke: 'rgb(255, 255, 255)',
                                    strokeDashoffset: 0,
                                    strokeDasharray: 'none'
                                }}/>
                                <path className="animate_stroke stroke_black" d="M253.8,320.3l4.5,5.3v9.4l-22.1-8.3v-8l4.9-2v-66.2l-4.8-2.5v-9.6h38.5v19.2h-8.4l-2.6-7.9h-9.8v22.2h7.3
							l2.9-4.2h5.9v19.8h-5.9l-2.8-4h-7.5v36.7" style={{
                                    stroke: 'rgb(255, 255, 255)',
                                    strokeDashoffset: 0,
                                    strokeDasharray: 'none'
                                }}/>
                                <path className="animate_stroke stroke_black"
                                      d="M278.3,323.8v-9.4l5.5-4.5v-59l-4.7-2.5v-9.6h22.1v9.6l-4.3,2.5v55.6l9.5-2.6l1.8-14.5h9.1v24.3L278.2,324"
                                      style={{
                                          stroke: 'rgb(255, 255, 255)',
                                          strokeDashoffset: 0,
                                          strokeDasharray: 'none'
                                      }}/>
                            </g>
                            <g>
                                <path className="animate_stroke stroke_black" d="M255.7,183.3c-3-2.5-6.3-4-9.9-4.8c0.9-0.8,1.7-1.5,2.5-2.2c4.4,1.1,7.4,3.1,9.5,4.8
							C257.1,181.9,256.4,182.6,255.7,183.3L255.7,183.3z M251.4,188.5c-2.8-2.4-6.3-4.2-10.2-5c0.6-0.8,1.3-1.6,2-2.4
							c3,0.5,6.8,2.1,10.2,4.9C252.6,186.9,252,187.7,251.4,188.5L251.4,188.5z M247.5,194c-3.1-2.6-6.6-4.1-10.2-4.8
							c0,0,1.1-1.8,1.7-2.7c4.3,0.9,7.8,2.9,10.2,4.9C248.6,192.3,248,193.2,247.5,194L247.5,194z M267.8,168c0,0-3.5,1.8-8.3,6.6
							c1.1,0.6,2.3,1.5,3,2.1c-0.7,0.6-1.5,1.4-2.2,2c-3.2-2.6-6.4-3.9-9-4.5c0.8-0.6,1.7-1.2,2.6-1.8c1.4,0.3,2.7,0.9,2.7,0.9
							c5.5-4.2,10.2-6,10.2-6s-0.5-0.3-2-0.2c-21.5,0.3-41.3,16.3-37.6,43.8c0.4,2.9,1.5,8.2,3,10.6c0.5-4.6,2.2-14.7,7.3-25.6
							c-1.8-0.6-3.2-0.9-3.2-0.9c0.5-1.1,1.2-2.5,1.2-2.5c3.8,0.7,7.1,2.3,10,4.6c-0.7,1.1-1.2,1.9-1.5,2.4c-1-0.8-2-1.5-3.2-2.1
							c-5.7,10-8.4,19.5-9.5,24.4c0.1,0.3,0.7,0.5,1.2,0.4c23.6-3.1,34.5-15.1,37.9-28.1c2.2-8.5,1.5-17.5-1.5-24.8
							C268.8,168.8,268.4,167.9,267.8,168" style={{
                                    stroke: 'rgb(255, 255, 255)',
                                    strokeDashoffset: 0,
                                    strokeDasharray: 'none'
                                }}/>
                                <path className="animate_star stroke_black"
                                      d="M208.7,189.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L208.7,189.3"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                                <path className="animate_star stroke_black"
                                      d="M293.5,197l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L293.5,197"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                                <path className="animate_star stroke_black"
                                      d="M208.7,215.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L208.7,215.3"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                                <path className="animate_star stroke_black"
                                      d="M293.5,223.1l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L293.5,223.1"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                                <path className="animate_star stroke_black"
                                      d="M179.7,189.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L179.7,189.3"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                                <path className="animate_star stroke_black"
                                      d="M322.7,197l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L322.7,197"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                                <path className="animate_star stroke_black"
                                      d="M179.7,215.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L179.7,215.3"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                                <path className="animate_star stroke_black"
                                      d="M322.7,223.1l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L322.7,223.1"
                                      style={{stroke: 'rgb(0, 0, 0)', strokeDashoffset: 0, strokeDasharray: 'none'}}/>
                            </g>
                        </g>
                        <g className="fill">
                            <path className="animate_fill fill_white" d="M250,127.4c0,0-9.4,28.2-42.2,36.3c-18.9,4.7-33.5-2.9-41.3-8.4h-5.9v152.2c0,4,0.9,11.5,7.2,19.3
						c7.7,9.3,20.8,15.3,38.8,17.9c14.6,2.1,25.2,6.6,32.6,13.9c5.6,5.3,10.9,14.5,10.9,14.5s5.4-9.4,10.7-14.5
						c7.5-7.2,18.2-11.7,32.6-13.9c18.1-2.6,31.1-8.7,38.8-18c6.2-7.6,7.2-15.2,7.2-19V155.5h-5.9c-7.5,5.6-22.6,12.9-41.2,8.2
						C259.4,155.7,250,127.4,250,127.4" style={{opacity: 1}}/>
                            <path className="animate_fill fill_blue_nfl" d="M249.7,139.5c0,0-11.4,22.1-41,29.4c-24.9,6.2-42.9-7.8-42.9-7.8v146.3c0,5,2.1,26.1,41.6,31.7
						c15.6,2.3,27.2,7.2,35.4,15.3c3,2.9,5.3,5.8,7,8.5c1.7-2.7,4-5.6,7-8.5c8.4-8,20-13,35.4-15.3c39.5-5.7,41.3-26.8,41.6-31.7V161.2
						c0,0-18,14.1-43.2,7.8C261.3,161.6,249.7,139.5,249.7,139.5" style={{opacity: 1}}/>
                            <path className="animate_fill fill_white" clipPath="url(#mask_nfl_shield)" d="M249.7,348.4c0,0,11.7-14.1,41.3-18.7c34.2-5.2,32.9-21.2,32.9-22V231H175.8v76.7c0,0.8-1,16.8,32.9,22
						C238.4,334.3,249.7,348.4,249.7,348.4" style={{opacity: 1}}/>
                            <g>
                                <path className="animate_fill fill_red3" d="M227.2,325l-11.1-3.3L200,274.1l0,31.4l5.1,3.9v9.7l-22.3-5.7v-8.2l5.1-2v-52.5l-5.2-2.6v-9.4h16.9l15.8,48.5
							l-0.1-36.3l-4.6-2.6v-9.4h20.8v9.4l-4.3,2.6V325z" style={{opacity: 1}}/>
                                <path className="animate_fill fill_red3" d="M253.8,320.3l4.5,5.3v9.4l-22.1-8.3v-8l4.9-2v-66.2l-4.8-2.5v-9.6h38.5v19.2h-8.4l-2.6-7.9h-9.8v22.2h7.3
							l2.9-4.2h5.9v19.8h-5.9l-2.8-4h-7.5v36.7" style={{opacity: 1}}/>
                                <path className="animate_fill fill_red3"
                                      d="M278.3,323.8v-9.4l5.5-4.5v-59l-4.7-2.5v-9.6h22.1v9.6l-4.3,2.5v55.6l9.5-2.6l1.8-14.5h9.1v24.3L278.2,324"
                                      style={{opacity: 1}}/>
                            </g>
                            <g>
                                <path className="animate_fill fill_white football" d="M255.7,183.3c-3-2.5-6.3-4-9.9-4.8c0.9-0.8,1.7-1.5,2.5-2.2c4.4,1.1,7.4,3.1,9.5,4.8
							C257.1,181.9,256.4,182.6,255.7,183.3L255.7,183.3z M251.4,188.5c-2.8-2.4-6.3-4.2-10.2-5c0.6-0.8,1.3-1.6,2-2.4
							c3,0.5,6.8,2.1,10.2,4.9C252.6,186.9,252,187.7,251.4,188.5L251.4,188.5z M247.5,194c-3.1-2.6-6.6-4.1-10.2-4.8
							c0,0,1.1-1.8,1.7-2.7c4.3,0.9,7.8,2.9,10.2,4.9C248.6,192.3,248,193.2,247.5,194L247.5,194z M267.8,168c0,0-3.5,1.8-8.3,6.6
							c1.1,0.6,2.3,1.5,3,2.1c-0.7,0.6-1.5,1.4-2.2,2c-3.2-2.6-6.4-3.9-9-4.5c0.8-0.6,1.7-1.2,2.6-1.8c1.4,0.3,2.7,0.9,2.7,0.9
							c5.5-4.2,10.2-6,10.2-6s-0.5-0.3-2-0.2c-21.5,0.3-41.3,16.3-37.6,43.8c0.4,2.9,1.5,8.2,3,10.6c0.5-4.6,2.2-14.7,7.3-25.6
							c-1.8-0.6-3.2-0.9-3.2-0.9c0.5-1.1,1.2-2.5,1.2-2.5c3.8,0.7,7.1,2.3,10,4.6c-0.7,1.1-1.2,1.9-1.5,2.4c-1-0.8-2-1.5-3.2-2.1
							c-5.7,10-8.4,19.5-9.5,24.4c0.1,0.3,0.7,0.5,1.2,0.4c23.6-3.1,34.5-15.1,37.9-28.1c2.2-8.5,1.5-17.5-1.5-24.8
							C268.8,168.8,268.4,167.9,267.8,168" style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M208.7,189.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L208.7,189.3"
                                      style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M293.5,197l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L293.5,197"
                                      style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M208.7,215.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L208.7,215.3"
                                      style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M293.5,223.1l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L293.5,223.1"
                                      style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M179.7,189.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L179.7,189.3"
                                      style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M322.7,197l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L322.7,197"
                                      style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M179.7,215.3l-6.7-5h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1l2.5,7.9l-6.7-4.7l-6.7,4.7L179.7,215.3"
                                      style={{opacity: 1}}/>
                                <path className="animate_star fill_white"
                                      d="M322.7,223.1l-6.7-4.7l-6.7,4.7l2.5-7.9l-6.7-5.1h8.2l2.7-7.8l2.7,7.8h8.2l-6.7,5.1L322.7,223.1"
                                      style={{opacity: 1}}/>
                            </g>
                        </g>
                    </svg>
                </div>
                <BlockRevealAnimation color="#0B2444">
                    This will be revealed
                </BlockRevealAnimation>
                <br/>
                <BlockRevealAnimation delay={1.25} color="#D42027">
                    This will be revealed
                </BlockRevealAnimation>
                {/*<button onClick={changeLogo("nfl")}>aaa</button>*/}
            </div>
        );
    }


}

export default LogoNFL;
