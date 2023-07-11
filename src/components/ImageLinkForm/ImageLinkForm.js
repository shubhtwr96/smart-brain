import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange,onSubmit })=>{
    return (
        <div>
            <p>
                {'This Magic Brain will detect faces in your pictures.Give it a try'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input type="text" className="f4 pa2 w-70 center" onChange={onInputChange}/>
                    <button className="w-30 grow link f4 ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>detect</button>
                </div>
            </div>
        </div>
    );
}


export default ImageLinkForm;