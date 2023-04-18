
import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import Navigation  from './components/Navigation/Navigation';
import Logo  from './components/Logo/Logo';
import Rank  from './components/Rank/Rank';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition  from './components/FaceRecognition/FaceRecognition';
import './App.css';




const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'e0e1d40ce8114b4ca377e610579b0c35';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'rado';       
    const APP_ID = 'smart-brain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection'; 
    const IMAGE_URL = imageUrl;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

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
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
}

    

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        console.log('click');
        this.setState({imageUrl: this.state.input});
        fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(data => console.log(data.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));
    }
    
    render() {
        return (
            <div className="App">
                <ParticlesBg className='particles' num={250} type="cobweb" color="#F0F8FF" bg={true} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
            
                />
                <FaceRecognition imageUrl={this.state.imageUrl} />
            </div>
    );
    }
}

export default App;
