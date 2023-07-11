import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl,box}) =>{
    return (
        <div className="center ma">
            <div className="absolute mt2"> 
                <img id='inputimage'height='auto'width='700px'alt=''src={imageUrl}/>
                <div className="bounding-box" style={{top:box.toprow,right:box.rightcol,left:box.leftcol,bottom:box.bottomrow}}></div>
            </div>
            
        </div>
    );
}

export default FaceRecognition;