import {useState, useEffect} from 'react';

function App() {
	const [users] = useState(false);

	function getUsers(){
		fetch("http://localhost:3001")
		.then(response => {
				return response.text();
		})
	}

	useEffect(() => {
		getUsers();
	}, [])
	return (
		<div>
			{users ? users : "There are no users"};
		</div>
	)
}
export default App;
