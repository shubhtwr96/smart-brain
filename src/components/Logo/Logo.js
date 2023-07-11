import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

const Logo = ()=>{
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" style={{width:'150px'}}>
                <div style={{ height: '150px', background: 'background: linear-gradient(89deg, #ff5edf 0%,#04c8de)',width:'150px' }}>
                    <img alt='logo' src={brain} height={'125px'} style={{paddingTop:'10px'}}/>
                </div>
            </Tilt>
        </div>
    );
}



export default Logo;