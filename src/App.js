
import React, {Component} from 'react';
// import Clarifai from 'clarifai';
import Navigation  from './components/Navigation/Navigation';
import Logo  from './components/Logo/Logo';
import Rank  from './components/Rank/Rank';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';
import './App.css';


// const Clarifai = require('clarifai');

// const app = new Clarifai.App({
//  apiKey: '4d621810ffbf41178f96ba6328ff442d'
// });

const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'e0e1d40ce8114b4ca377e610579b0c35';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'rado';       
    const APP_ID = 'smart-brain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
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
    }

    return requestOptions;
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
        
        console.log(event.target.value)
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        console.log('click')
        this.setState({imageUrl: this.state.input});
        console.log(this.state.input);

        fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + '6dc7e46bc9124c5c8824be4822abe105' + "/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(data => console.log(data))
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
                {/* <FaceRecognition /> */}
            </div>
    );
    }
}

export default App;
