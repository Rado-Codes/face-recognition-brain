
import Navigation  from './components/Navigation/Navigation';
import Logo  from './components/Logo/Logo';
import Rank  from './components/Rank/Rank';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';
import './App.css';





function App() {
    return (
            <div className="App">
                <ParticlesBg className='particles' num={250} type="cobweb" color="#F0F8FF" bg={true} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm />
                {/* <FaceRecognition /> */}
            </div>
    );
}

export default App;
