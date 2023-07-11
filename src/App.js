
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
// const Clarifai = require('clarifai');

const getface = (imageUrl) =>{
  const PAT = '930c8f43ae3a470897de5ad97e5f9416';
    const USER_ID = 'shubhtwr96';       
    const APP_ID = 'faceidentify';
    const MODEL_ID = 'face-detection'; 
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
  
};


const initialstate={
  
    input: '',
    imageUrl:'',
    box:{},
    route:'signin',
    isSignedIn:false,
    user: {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
    }
  
}

class App extends Component {
  constructor() {
    super();
    this.state = initialstate;
  }

  loadUser = (data) => {
    this.setState({user : {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation= (data) =>{
    const clarifaiData=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol:clarifaiData.left_col*width,
      toprow: clarifaiData.top_row * height,
      rightcol:width-(clarifaiData.right_col * width),
      bottomrow: height-(clarifaiData.bottom_row * height)
    }
  }

  displayFace = (box) =>{
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl:this.state.input});
    // app.models.predict("802c93c82eb942a4aa5938dccab8fc2f","https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75")
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", getface(this.state.input))
        .then(response => response.json())
    .then(response=>{
      if(response){
        fetch('http://localhost:3000/image',{
                method:'put',
                headers:{'Content-type':'application/json'},
                body: JSON.stringify({
                id: this.state.user.id,
            })
        })
        .then(response=> response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        .catch(console.log)
      }
      this.displayFace(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err))
  }

  onRouteChange = (route) =>{
    if(route==='signout'){
      this.setState(initialstate)
    }
    else if (route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  render(){
     const {isSignedIn, imageUrl, route, box}  = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          route==='home' 
          ? <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          :(
              route==='signin'
              ? <SignIn loadUser={this.loadUser}onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser}onRouteChange={this.onRouteChange}/>
          )
          
        }
      </div>
    );
  }
}

export default App;
