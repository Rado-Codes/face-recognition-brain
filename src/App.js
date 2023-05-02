
import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation  from './components/Navigation/Navigation';
import Signin  from './components/Signin/Signin';
import Register  from './components/Register/Register';
import Logo  from './components/Logo/Logo';
import Rank  from './components/Rank/Rank';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition  from './components/FaceRecognition/FaceRecognition';
import './App.css';




const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
} 

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);
        //returns an object of data (percentage) for creating box
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        console.log('click');
        this.setState({imageUrl: this.state.input});
        //set fetching clarifai on backend, sending just this.state.input in request body
        fetch('https://face-recognition-brain-api-ro1l.onrender.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json()) //receive from backend response that needs to be an object in JS
        // this is to be send on backend
        // fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => {
            if(response){
                fetch('https://face-recognition-brain-api-ro1l.onrender.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    //sending in request body with data from front end
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
                })
                .catch(console.log);
            }
            return response})
        //calculate faceLocation and then displayFaceBox
        .then(data => this.displayFaceBox(this.calculateFaceLocation(data)))
        .catch(error => console.log('error', error));
    }
    
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <ParticlesBg className='particles' num={250} type="cobweb" color="#F0F8FF" bg={true} />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                {/* conditions for changing state.route: home, signin, register */}
                { route === 'home' 
                    ?   <div>
                            <Logo />
                            <Rank name={this.state.user.name} entries={this.state.user.entries} />
                            <ImageLinkForm 
                                onInputChange={this.onInputChange}
                                onButtonSubmit={this.onButtonSubmit}
                            />
                            <FaceRecognition box={box} imageUrl={imageUrl} />
                        </div> 
                    : (
                        this.state.route === 'signin' 
                        ?   <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                        :   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                    )
                }
            </div>
        );
    }
}

export default App;
