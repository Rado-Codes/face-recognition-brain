import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface DataProps {
	id: number;
	name: string;
	email: string;
	entires: number;
	joined: Date;
}

interface RegisterProps {
	loadUser: (data: DataProps) => void;
	onRouteChange: (route: string) => void;
}

function Register({ loadUser, onRouteChange }: RegisterProps) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}));
	}

	const [isLoading, setIsLoading] = useState(false);

	function onSubmitSignIn() {
		console.log(formData);
		setIsLoading(true);
		fetch('https://face-recognition-brain-api-ro1l.onrender.com/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			//sending in request body with data from front end
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			//server responds with user
			.then((user) => {
				if (user.id) {
					//does the user exist? Did we receive a user with a property of id?
					loadUser(user);
					setIsLoading(false);
					onRouteChange('home');
				}
			});
	}

	return (
		<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
			<main className='pa4 black-80'>
				<div className='measure'>
					<fieldset
						id='sign_up'
						className='ba b--transparent ph0 mh0'
					>
						<legend className='f1 fw6 ph0 mh0'>Register</legend>
						<div className='mt3'>
							<label className='db fw6 lh-copy f6' htmlFor='name'>
								Name
							</label>
							<input
								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='text'
								name='name'
								id='name'
								onChange={onInputChange}
							/>
						</div>
						<div className='mt3'>
							<label
								className='db fw6 lh-copy f6'
								htmlFor='email-address'
							>
								Email
							</label>
							<input
								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='email'
								name='email'
								id='email-address'
								required
								onChange={onInputChange}
							/>
						</div>
						<div className='mv3'>
							<label
								className='db fw6 lh-copy f6'
								htmlFor='password'
							>
								Password
							</label>
							<input
								className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='password'
								name='password'
								id='password'
								required
								onChange={onInputChange}
							/>
						</div>
					</fieldset>
					<div
						className='h2'
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<input
							onClick={onSubmitSignIn}
							className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
							type='submit'
							value='Register'
							style={{
								position: 'absolute',
								left: '50%',
								transform: 'translateX(-50%)',
							}}
						/>
						{isLoading && <LoadingSpinner />}
					</div>
				</div>
			</main>
		</article>
	);
}

export default Register;
