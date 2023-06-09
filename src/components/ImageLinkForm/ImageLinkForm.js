import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm({ onInputChange, onButtonSubmit, errorDisplay }) {
	return (
		<div>
			<p className='f3'>
				{
					'This Magic Brain will detect faces in your pictures. Give it a try.'
				}
			</p>
			<p className='white f3 w-70 center'>{errorDisplay}</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input
						className='f4 pa2 w-70 center b--white'
						type='text'
						onChange={onInputChange}
						placeholder='enter image URL'
					/>
					<button
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple b--white'
						onClick={onButtonSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;
