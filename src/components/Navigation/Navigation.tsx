interface NavigationProps {
	onRouteChange: (route: string) => void;
	isSignedIn: boolean;
}

function Navigation({ onRouteChange, isSignedIn }: NavigationProps) {
	if (isSignedIn) {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => onRouteChange('signout')}
					className='f3 link dim black underline pa3 pointer'
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => onRouteChange('signin')}
					className='f3 link dim black underline pa3 pointer'
				>
					Sign In
				</p>
				<p
					onClick={() => onRouteChange('register')}
					className='f3 link dim black underline pa3 pointer'
				>
					Register
				</p>
			</nav>
		);
	}
}

export default Navigation;
