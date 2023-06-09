import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Register({ loadUser, onRouteChange }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	function onEmailChange(event) {
		setEmail(event.target.value);
	}

	function onPasswordChange(event) {
		setPassword(event.target.value);
	}

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onSubmitSignIn() {
		setIsLoading(true);
		fetch('https://face-recognition-brain-api-ro1l.onrender.com/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			//sending in request body with data from front end
			body: JSON.stringify({
				email: email,
				password: password,
				name: name,
			}),
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
								onChange={onNameChange}
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
								name='email-address'
								id='email-address'
								required
								onChange={onEmailChange}
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
								onChange={onPasswordChange}
							/>
						</div>
					</fieldset>
					<div
						className=''
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
						{isLoading ? (
							<LoadingSpinner />
						) : (
							<div className='empty-div'></div>
						)}
						{/* <LoadingSpinner /> */}
					</div>
				</div>
			</main>
		</article>
	);
}

export default Register;
