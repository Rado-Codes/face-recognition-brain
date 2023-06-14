import { useState, useEffect } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

// const initialState = {
// 	input: '',
// 	imageUrl: '',
// 	box: {},
// 	route: 'signin',
// 	isSignedIn: false,
// 	user: {
// 		id: '',
// 		name: '',
// 		email: '',
// 		entries: 0,
// 		joined: '',
// 	},
// };

interface Box {
	topRow: number;
	bottomRow: number;
	rightCol: number;
	leftCol: number;
}

interface ImageStateData {
	input: string;
	imageUrl: string;
	boxes: Box[];
}
interface User {
	id: number | string;
	name: string;
	email: string;
	entries: number;
	joined: Date | string;
}

interface LoadUser {
	id: number;
	name: string;
	email: string;
	entries: number;
	joined: Date;
}

interface ClarifaiFace {
	top_row: number;
	bottom_row: number;
	right_col: number;
	left_col: number;
}
const defaultImage = {
	input: '',
	imageUrl: '',
	boxes: [],
};

interface DataResponse {
	status: {
		code: number;
		description: string;
		req_id: string;
	};
	outputs: any[];
}

interface Region_Info {
	bounding_box: ClarifaiFace;
}

interface Region {
	id: string;
	region_info: Region_Info;
	data: unknown;
	value: number;
}

const defaultUser = {
	id: '',
	name: '',
	email: '',
	entries: 0,
	joined: '',
};

function App() {
	const [imageState, setImageState] = useState<ImageStateData>(defaultImage);
	const [routeState, setRouteState] = useState('signin');
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [userState, setUserState] = useState<User>(defaultUser);

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isError, setIsError] = useState('');

	function loadUser(data: LoadUser) {
		setUserState({
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined,
		});
	}

	function calculateFaceLocation(data: DataResponse): Box[] {
		console.log(data);
		if (!data.outputs[0]?.data.regions[0]) {
			return [];
		}

		setIsError(''); //clear up comment

		const clarifaiRegions = data.outputs[0].data.regions;
		const clarifaiBoundingBox = clarifaiRegions.map((region: Region) => {
			console.log('REGION', region);
			return region.region_info.bounding_box;
		});
		// data.outputs[0].data.regions[0].region_info.bounding_box;
		const image: HTMLImageElement = document.getElementById(
			'inputImage'
		) as HTMLImageElement;
		const width: number = Number(image.width);
		const height: number = Number(image.height);
		console.log(width, height);
		//returns an object of data (percentage) for creating box
		console.log(clarifaiBoundingBox);
		const clarifaiFacesPercentage: Box[] = clarifaiBoundingBox.map(
			(clarifaiFace: ClarifaiFace) => {
				return {
					leftCol: clarifaiFace.left_col * width,
					topRow: clarifaiFace.top_row * height,
					rightCol: width - clarifaiFace.right_col * width,
					bottomRow: height - clarifaiFace.bottom_row * height,
				};
			}
		);
		return clarifaiFacesPercentage;
	}

	function displayFaceBox(boxes: Box[]) {
		setImageState({
			...imageState,
			boxes: boxes,
		});
	}

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setImageState({
			...imageState,
			input: event.target.value,
		});
	}

	function handleError(error: any) {
		setImageState({
			...imageState,
			boxes: [],
		});
		setIsError('There is no face in this image');
	}

	//fetchig Data after Submission of URL
	/*
	useEffect(() => {
		if (isSubmitted) {
			//set fetching clarifai on backend, sending just this.state.input in request body
			fetch(
				'https://face-recognition-brain-api-ro1l.onrender.com/imageurl',
				{
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						input: imageState.input,
					}),
				}
			)
				.then((response) => response.json()) //receive from backend response that needs to be an object in JS
				// this is to be send on backend
				// fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
				.then((response) => {
					if (response) {
						fetch(
							'https://face-recognition-brain-api-ro1l.onrender.com/image',
							{
								method: 'put',
								headers: { 'Content-Type': 'application/json' },
								//sending in request body with data from front end
								body: JSON.stringify({
									id: userState.id,
								}),
							}
						)
							.then((response) => response.json())
							.then((count) => {
								setUserState({
									...userState,
									entries: count,
								});
							})
							.catch(console.log);
					}
					return response;
				})
				//calculate faceLocation and then displayFaceBox
				.then((data: any) =>
					displayFaceBox(calculateFaceLocation(data))
				)
				.catch((error) => handleError(error));
			setIsSubmitted(false);
		}
	}, [isSubmitted]);
	*/

	useEffect(() => {
		//set fetching clarifai on backend, sending just this.state.input in request body
		async function fetchImageUrl(): Promise<void> {
			if (isSubmitted) {
				try {
					const resp = await fetch(
						'https://face-recognition-brain-api-ro1l.onrender.com/imageurl',
						{
							method: 'post',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								input: imageState.input,
							}),
						}
					);
					const data: DataResponse = await resp.json(); //receive from backend response that needs to be an object in JS
					//add entry to the database
					if (data) {
						try {
							const countResponse = await fetch(
								'https://face-recognition-brain-api-ro1l.onrender.com/image',
								{
									method: 'put',
									headers: {
										'Content-Type': 'application/json',
									},
									//sending in request body with data from front end
									body: JSON.stringify({
										id: userState.id,
									}),
								}
							);
							const count = await countResponse.json();
							setUserState({
								...userState,
								entries: count,
							});
						} catch (error) {
							console.log(error);
						}
					}
					displayFaceBox(calculateFaceLocation(data));
				} catch (error) {
					handleError(error);
				}
				setIsSubmitted(false);
			}
		}
		fetchImageUrl();
	}, [isSubmitted]);

	function onButtonSubmit() {
		console.log('click');
		setImageState({
			...imageState,
			imageUrl: imageState.input,
		});
		setIsSubmitted(true);
	}

	function onRouteChange(route: string) {
		if (route === 'signout') {
			setImageState(defaultImage);
			setUserState(defaultUser);
			setIsSignedIn(false);
		} else if (route === 'home') {
			setIsSignedIn(true);
		}
		setRouteState(route);
	}
	return (
		<div className='App'>
			<ParticlesBg
				// className='particles'
				num={250}
				type='cobweb'
				color='#F0F8FF'
				bg={true}
			/>
			<Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
			{/* conditions for changing state.route: home, signin, register */}
			{routeState === 'home' ? (
				<div>
					<Logo />
					<Rank name={userState.name} entries={userState.entries} />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onButtonSubmit}
						errorDisplay={isError}
					/>
					<FaceRecognition
						boxes={imageState.boxes}
						imageUrl={imageState.imageUrl}
					/>
				</div>
			) : routeState === 'signin' ? (
				<Signin loadUser={loadUser} onRouteChange={onRouteChange} />
			) : (
				<Register loadUser={loadUser} onRouteChange={onRouteChange} />
			)}
		</div>
	);
}

export default App;
