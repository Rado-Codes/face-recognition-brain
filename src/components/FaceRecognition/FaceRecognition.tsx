import './FaceRecognition.css';

interface Box {
	topRow: number;
	bottomRow: number;
	rightCol: number;
	leftCol: number;
}

interface FaceRecognitionProps {
	imageUrl: string;
	boxes: Box[];
}

function FaceRecognition({ imageUrl, boxes }: FaceRecognitionProps) {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img
					id='inputImage'
					alt=''
					src={imageUrl}
					width='500px'
					height='auto'
				/>

				{/* Draw boxes based on Clarifai API */}
				{boxes[0] &&
					boxes.map((box, i) => {
						return (
							<div
								key={i}
								className='bounding-box'
								style={{
									top: box.topRow,
									right: box.rightCol,
									bottom: box.bottomRow,
									left: box.leftCol,
								}}
							></div>
						);
					})}
			</div>
		</div>
	);
}

export default FaceRecognition;
